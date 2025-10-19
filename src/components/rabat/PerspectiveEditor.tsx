import { useState, useEffect, useRef, useMemo } from 'react';
import imageCompression from 'browser-image-compression';
import { supabase, type Article } from '../../lib/supabase';

interface PerspectiveEditorProps {
  article: Article | null;
  onSave: () => void;
  onCancel: () => void;
}

export default function PerspectiveEditor({ article, onSave, onCancel }: PerspectiveEditorProps) {
  const [content, setContent] = useState(article?.content || '');
  const [status, setStatus] = useState<'draft' | 'published'>(article?.status || 'draft');
  const [saving, setSaving] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [ReactQuill, setReactQuill] = useState<any>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(article);
  const quillRef = useRef<any>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  // Handle native fullscreen
  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      // Enter fullscreen
      try {
        await editorContainerRef.current?.requestFullscreen();
        setFullscreen(true);
      } catch (err) {
        console.error('Error entering fullscreen:', err);
      }
    } else {
      // Exit fullscreen
      try {
        await document.exitFullscreen();
        setFullscreen(false);
      } catch (err) {
        console.error('Error exiting fullscreen:', err);
      }
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Initialize Quill editor with custom drop cap blot
  useEffect(() => {
    const originalError = console.error;
    
    // Suppress React findDOMNode warnings from ReactQuill
    console.error = (...args: any[]) => {
      if (typeof args[0] === 'string' && (args[0].includes('findDOMNode') || args[0].includes('DevTools'))) {
        return;
      }
      originalError.apply(console, args);
    };

    // Load Quill CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css';
    document.head.appendChild(link);

    // Initialize ReactQuill and register custom blot
    link.onload = () => {
      import('react-quill').then((mod) => {
        const ReactQuillComponent = mod.default;
        const Quill = (ReactQuillComponent as any).Quill;
        
        if (Quill) {
          const Inline = Quill.import('blots/inline');

          // Custom Drop Cap Blot - preserves <span class="drop-cap-letter">
          class DropCapBlot extends Inline {
            static blotName = 'drop-cap';
            static className = 'drop-cap-letter';
            static tagName = 'span';

            static create(value: any) {
              const node = super.create(value);
              node.classList.add('drop-cap-letter');
              return node;
            }

            static formats(node: HTMLElement) {
              return node.classList.contains('drop-cap-letter');
            }
          }

          try {
            Quill.register(DropCapBlot, true);
          } catch (e) {
            // Blot already registered, ignore
          }
        }
        
        setReactQuill(() => ReactQuillComponent);
        setMounted(true);
      });
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  // Drop cap handler
  const handleDropCap = () => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const range = quill.getSelection();
    if (!range) {
      alert('Please place your cursor in a paragraph first');
      return;
    }

    // Get the line at cursor position
    const [line, offset] = quill.getLine(range.index);
    if (!line || !line.domNode) return;

    const paragraph = line.domNode;
    if (paragraph.tagName !== 'P') {
      alert('Drop cap can only be applied to paragraphs');
      return;
    }

    // Calculate the start of this paragraph in the document
    const lineStart = range.index - offset;
    
    // Get the text of the entire paragraph
    const lineText = quill.getText(lineStart, line.length());
    
    // Find the first letter in the paragraph
    const match = lineText.match(/[A-Za-z]/);
    if (!match) {
      alert('No letter found in this paragraph');
      return;
    }

    const firstLetterIndex = lineStart + (match.index || 0);
    
    // Check if already has drop cap format
    const format = quill.getFormat(firstLetterIndex, 1);
    if (format['drop-cap']) {
      alert('This paragraph already has a drop cap');
      return;
    }

    // Apply drop cap format to the first character
    quill.formatText(firstLetterIndex, 1, 'drop-cap', true);
    
    // Move cursor after the formatted character
    quill.setSelection(firstLetterIndex + 1, 0);
  };

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);

      // Compress image
      const compressedFile = await imageCompression(file, {
        maxWidthOrHeight: 1200,
        useWebWorker: true,
        fileType: 'image/webp',
      });

      // Generate unique filename
      const fileName = `${Date.now()}-${file.name.replace(/\.[^/.]+$/, '')}.webp`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('article-images')
        .upload(fileName, compressedFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from('article-images')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      try {
        const url = await uploadImage(file);
        const quill = quillRef.current?.getEditor();
        if (quill) {
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, 'image', url);
          quill.setSelection(range.index + 1);
        }
      } catch (error) {
        alert('Failed to upload image');
      }
    };
  };

  const createArticle = async () => {
    try {
      setSaving(true);
      
      const { data, error } = await supabase
        .from('articles')
        .insert({
          title: 'Untitled Article',
          slug: `untitled-${Date.now()}`,
          excerpt: '',
          content,
          status: 'draft',
          category: 'Digital Transformation',
        })
        .select()
        .single();

      if (error) throw error;
      
      setCurrentArticle(data);
      return data;
    } catch (error: any) {
      console.error('Error creating article:', error);
      alert(error.message || 'Failed to create article');
      return null;
    } finally {
      setSaving(false);
    }
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleSave = async () => {
    if (!currentArticle) {
      // Create article if it doesn't exist
      const newArticle = await createArticle();
      if (newArticle) {
        onSave();
      }
      return;
    }

    try {
      setSaving(true);

      const { error } = await supabase
        .from('articles')
        .update({
          content,
          status,
          updated_at: new Date().toISOString(),
          ...(status === 'published' && !currentArticle.published_at && {
            published_at: new Date().toISOString(),
          }),
        })
        .eq('id', currentArticle.id);

      if (error) throw error;
      onSave();
    } catch (error: any) {
      console.error('Error saving article:', error);
      alert(error.message || 'Failed to save article');
    } finally {
      setSaving(false);
    }
  };

  // Customize drop cap button icon
  useEffect(() => {
    if (!mounted) return;
    
    const timer = setTimeout(() => {
      const dropCapBtn = document.querySelector('.ql-drop-cap');
      if (dropCapBtn) {
        dropCapBtn.innerHTML = `
          <svg viewBox="0 0 18 18" style="width: 18px; height: 18px;">
            <text x="1" y="14" font-size="14" font-weight="bold" fill="currentColor">A</text>
            <text x="9" y="16" font-size="7" fill="currentColor">a</text>
          </svg>
        `;
        dropCapBtn.setAttribute('title', 'Apply Drop Cap');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [mounted]);

  // Pastel colors for background highlighting
  const pastelColors = [
    '#FFF4E6', // Peach
    '#FFE4E1', // Pink
    '#E6F3FF', // Sky Blue
    '#F0FFF4', // Mint
    '#FFF0F5', // Lavender
    '#FFF8DC', // Cream
  ];

  // Memoize modules to prevent re-initialization
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline'],
        [{ align: [] }],
        [{ background: pastelColors }],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['drop-cap'],
        ['clean'],
      ],
      handlers: {
        image: imageHandler,
        'drop-cap': handleDropCap,
      },
    },
  }), []);

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'align',
    'background',
    'blockquote',
    'code-block',
    'list',
    'bullet',
    'link',
    'image',
    'drop-cap',
  ];

  return (
    <div 
      ref={editorContainerRef}
      className="min-h-screen bg-white dark:bg-slate-900"
    >
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-600 transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleFullscreen}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-600 transition-colors"
            >
              {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </button>
            <button
              onClick={() => {
                setStatus('draft');
                handleSave();
              }}
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-600 transition-colors disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              onClick={() => {
                setStatus('published');
                handleSave();
              }}
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-600 transition-colors disabled:opacity-50"
            >
              Publish
            </button>
          </div>
        </div>
      </div>

      {/* Editor Container */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {uploading && (
          <div className="fixed top-20 right-6 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
            Uploading image...
          </div>
        )}
        {!mounted || !ReactQuill ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-slate-600 dark:text-slate-400">Loading editor...</div>
          </div>
        ) : (
          <div className="quill-wrapper">
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={content}
              onChange={handleContentChange}
              modules={modules}
              formats={formats}
              placeholder="Tell your story..."
            />
          </div>
        )}
      </div>

      {/* Clean CSS */}
      <style>{`
        /* Fullscreen Styling */
        :fullscreen {
          overflow-y: auto;
        }

        :-webkit-full-screen {
          overflow-y: auto;
        }

        :-moz-full-screen {
          overflow-y: auto;
        }

        /* Quill Editor Styling */
        .quill-wrapper {
          background: white;
          min-height: 70vh;
          border-radius: 8px;
        }

        .quill-wrapper .ql-toolbar {
          position: sticky;
          top: 65px;
          z-index: 40;
          background: white;
          border: none;
          border-bottom: 1px solid #e5e7eb;
          padding: 12px 0;
          border-radius: 8px 8px 0 0;
        }

        .quill-wrapper .ql-container {
          border: none;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 21px;
          line-height: 1.58;
          background: white;
        }

        .quill-wrapper .ql-editor {
          padding: 40px 0;
          min-height: 60vh;
          color: #1a1a1a;
          background: white !important;
        }

        .quill-wrapper .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
          position: static !important;
          left: 0 !important;
          right: 0 !important;
        }

        /* Typography */
        .quill-wrapper .ql-editor h1 {
          font-size: 42px;
          font-weight: 700;
          line-height: 1.2;
          margin: 1.5em 0 0.5em;
        }

        .quill-wrapper .ql-editor h2 {
          font-size: 32px;
          font-weight: 600;
          line-height: 1.25;
          margin: 1.8em 0 0.6em;
        }

        .quill-wrapper .ql-editor h3 {
          font-size: 26px;
          font-weight: 600;
          line-height: 1.3;
          margin: 1.5em 0 0.5em;
        }

        .quill-wrapper .ql-editor p {
          margin: 1.5em 0;
        }

        .quill-wrapper .ql-editor blockquote {
          border-left: 3px solid #1a1a1a;
          padding-left: 20px;
          margin: 1.8em 0;
          font-style: italic;
        }

        .quill-wrapper .ql-editor pre {
          background: #f3f4f6;
          padding: 20px;
          border-radius: 8px;
          margin: 1.8em 0;
        }

        .quill-wrapper .ql-editor code {
          background: #f3f4f6;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 0.9em;
        }

        .quill-wrapper .ql-editor pre code {
          background: none;
          padding: 0;
        }

        /* Lists - Override Quill defaults */
        .quill-wrapper .ql-editor ol {
          list-style-type: decimal !important;
          padding-left: 30px !important;
          margin: 1.5em 0 !important;
          counter-reset: none !important;
        }

        .quill-wrapper .ql-editor ol li {
          display: list-item !important;
          list-style-position: outside !important;
          list-style-type: decimal !important;
          padding-left: 0 !important;
        }

        .quill-wrapper .ql-editor ol li:before {
          display: none !important;
        }

        .quill-wrapper .ql-editor ul {
          list-style-type: disc !important;
          padding-left: 30px !important;
          margin: 1.5em 0 !important;
        }

        .quill-wrapper .ql-editor ul li {
          display: list-item !important;
          list-style-position: outside !important;
          list-style-type: disc !important;
          padding-left: 0 !important;
        }

        .quill-wrapper .ql-editor ul li:before {
          display: none !important;
        }

        .quill-wrapper .ql-editor li {
          margin: 0.5em 0;
        }

        /* Images */
        .quill-wrapper .ql-editor img {
          max-width: 100%;
          height: auto;
          margin: 2em 0;
          border-radius: 4px;
        }

        /* Drop Cap Styling */
        .quill-wrapper .ql-editor .drop-cap-letter {
          font-size: 4.5em;
          line-height: 0.85;
          float: left;
          margin: 0.05em 0.1em 0 0;
          font-weight: 700;
        }

        /* Dark Mode - Consolidated */
        @media (prefers-color-scheme: dark) {
          .quill-wrapper {
            background: #0f172a !important;
          }
          .quill-wrapper .ql-toolbar {
            background: #0f172a !important;
            border-bottom-color: #334155 !important;
          }
          .quill-wrapper .ql-container {
            background: #0f172a !important;
          }
          .quill-wrapper .ql-editor {
            color: #e2e8f0 !important;
            background: #0f172a !important;
          }
          .quill-wrapper .ql-editor.ql-blank::before {
            color: #64748b !important;
          }
          .quill-wrapper .ql-editor blockquote {
            border-left-color: #e2e8f0 !important;
          }
          .quill-wrapper .ql-editor pre,
          .quill-wrapper .ql-editor code {
            background: #1e293b !important;
          }
          .quill-wrapper .ql-stroke {
            stroke: #e2e8f0 !important;
          }
          .quill-wrapper .ql-fill {
            fill: #e2e8f0 !important;
          }
          .quill-wrapper .ql-picker-label {
            color: #e2e8f0 !important;
          }
          .quill-wrapper .ql-picker-options {
            background: #1e293b !important;
            border-color: #334155 !important;
          }
        }

        /* Dark mode with class */
        .dark .quill-wrapper {
          background: #0f172a !important;
        }
        .dark .quill-wrapper .ql-toolbar {
          background: #0f172a !important;
          border-bottom-color: #334155 !important;
        }
        .dark .quill-wrapper .ql-container {
          background: #0f172a !important;
        }
        .dark .quill-wrapper .ql-editor {
          color: #e2e8f0 !important;
          background: #0f172a !important;
        }
        .dark .quill-wrapper .ql-editor.ql-blank::before {
          color: #64748b !important;
        }
        .dark .quill-wrapper .ql-editor blockquote {
          border-left-color: #e2e8f0 !important;
        }
        .dark .quill-wrapper .ql-editor pre,
        .dark .quill-wrapper .ql-editor code {
          background: #1e293b !important;
        }
        .dark .quill-wrapper .ql-stroke {
          stroke: #e2e8f0 !important;
        }
        .dark .quill-wrapper .ql-fill {
          fill: #e2e8f0 !important;
        }
        .dark .quill-wrapper .ql-picker-label {
          color: #e2e8f0 !important;
        }
        .dark .quill-wrapper .ql-picker-options {
          background: #1e293b !important;
          border-color: #334155 !important;
        }
      `}</style>
    </div>
  );
}
