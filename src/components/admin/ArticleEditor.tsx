import { useState, useEffect, useRef, useMemo } from 'react';
import imageCompression from 'browser-image-compression';
import { supabase, type Article } from '../../lib/supabase';

interface ArticleEditorProps {
  article: Article | null;
  onSave: () => void;
  onCancel: () => void;
}

export default function ArticleEditor({ article, onSave, onCancel }: ArticleEditorProps) {
  const [content, setContent] = useState(article?.content || '');
  const [status, setStatus] = useState<'draft' | 'published'>(article?.status || 'draft');
  const [saving, setSaving] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [ReactQuill, setReactQuill] = useState<any>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(article);
  const quillRef = useRef<any>(null);
  const autoSaveTimeout = useRef<any>(null);

  useEffect(() => {
    // Suppress React warnings
    const originalError = console.error;
    console.error = (...args: any[]) => {
      if (
        typeof args[0] === 'string' &&
        (args[0].includes('findDOMNode') || args[0].includes('DevTools'))
      ) {
        return;
      }
      originalError.apply(console, args);
    };

    // Load Quill CSS from CDN
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css';
    document.head.appendChild(link);

    // Wait for CSS to load, then import ReactQuill
    link.onload = () => {
      import('react-quill').then((mod) => {
        setReactQuill(() => mod.default);
        setMounted(true);
      });
    };

    return () => {
      console.error = originalError;
    };
  }, []);

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

  const autoSave = async (newContent: string) => {
    // Clear existing timeout
    if (autoSaveTimeout.current) {
      clearTimeout(autoSaveTimeout.current);
    }

    // Set new timeout for auto-save (2 seconds after typing stops)
    autoSaveTimeout.current = setTimeout(async () => {
      try {
        setSaving(true);

        // If no article exists, create one first
        let articleToSave = currentArticle;
        if (!articleToSave) {
          articleToSave = await createArticle();
          if (!articleToSave) return;
        }

        // Update the article
        const { error } = await supabase
          .from('articles')
          .update({
            content: newContent,
            updated_at: new Date().toISOString(),
          })
          .eq('id', articleToSave.id);

        if (error) throw error;
      } catch (error: any) {
        console.error('Error auto-saving:', error);
      } finally {
        setSaving(false);
      }
    }, 2000);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    autoSave(value);
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
        [{ background: pastelColors }],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  }), []);

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'background',
    'blockquote',
    'code-block',
    'list',
    'bullet',
    'link',
    'image',
  ];

  return (
    <div className={`min-h-screen bg-white dark:bg-slate-900 ${fullscreen ? 'fixed inset-0 z-[100] overflow-y-auto' : ''}`}>
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <button
            onClick={onCancel}
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            {saving && <span className="text-sm text-slate-500 dark:text-slate-400">Saving...</span>}
            <button
              onClick={() => setFullscreen(!fullscreen)}
              className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title={fullscreen ? 'Exit fullscreen' : 'Fullscreen mode'}
            >
              {fullscreen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              )}
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
      <div className="max-w-5xl mx-auto px-6 py-12">
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
        /* Quill Editor Styling */
        .quill-wrapper {
          background: white;
          min-height: 70vh;
        }

        .quill-wrapper .ql-toolbar {
          position: sticky;
          top: 65px;
          z-index: 40;
          background: white;
          border: none;
          border-bottom: 1px solid #e5e7eb;
          padding: 12px 0;
        }

        .quill-wrapper .ql-container {
          border: none;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 21px;
          line-height: 1.58;
        }

        .quill-wrapper .ql-editor {
          padding: 40px 0;
          min-height: 60vh;
          color: #1a1a1a;
        }

        .quill-wrapper .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
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

        /* Lists */
        .quill-wrapper .ql-editor ol {
          list-style-type: decimal;
          padding-left: 30px;
          margin: 1.5em 0;
        }

        .quill-wrapper .ql-editor ul {
          list-style-type: disc;
          padding-left: 30px;
          margin: 1.5em 0;
        }

        .quill-wrapper .ql-editor li {
          display: list-item;
          list-style-position: outside;
          margin: 0.5em 0;
        }

        /* Images */
        .quill-wrapper .ql-editor img {
          max-width: 100%;
          height: auto;
          margin: 2em 0;
          border-radius: 4px;
        }

        /* Dark Mode */
        @media (prefers-color-scheme: dark) {
          .quill-wrapper {
            background: #0f172a;
          }

          .quill-wrapper .ql-toolbar {
            background: #0f172a;
            border-bottom-color: #334155;
          }

          .quill-wrapper .ql-container {
            background: #0f172a;
          }

          .quill-wrapper .ql-editor {
            color: #e2e8f0;
          }

          .quill-wrapper .ql-editor.ql-blank::before {
            color: #64748b;
          }

          .quill-wrapper .ql-editor blockquote {
            border-left-color: #e2e8f0;
          }

          .quill-wrapper .ql-editor pre,
          .quill-wrapper .ql-editor code {
            background: #1e293b;
          }

          .quill-wrapper .ql-stroke {
            stroke: #e2e8f0;
          }

          .quill-wrapper .ql-fill {
            fill: #e2e8f0;
          }
        }
      `}</style>
    </div>
  );
}
