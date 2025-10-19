import { useState, useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import imageCompression from 'browser-image-compression';
import { supabase, type Article } from '../../lib/supabase';

// Define Quill types
const Inline = Quill.import('blots/inline') as any;

/**
 * Custom Drop Cap Blot
 * Applies a drop cap style to the first letter of a paragraph
 */
class DropCapBlot extends Inline {
  static blotName = 'drop-cap';
  static className = 'drop-cap-letter';
  static tagName = 'span';

  static create() {
    const node = super.create();
    node.classList.add('drop-cap-letter');
    return node;
  }

  static formats(node: HTMLElement) {
    return node.classList.contains('drop-cap-letter');
  }
}

// Register custom blot
Quill.register(DropCapBlot as any, true);

interface PerspectiveEditorProps {
  article: Article | null;
  onSave: () => void;
  onCancel: () => void;
}

/**
 * PerspectiveEditor Component
 * A clean, professional Quill-based rich text editor for creating and editing articles
 * Features: Drop caps, pastel backgrounds, image upload, lists, links
 */
export default function PerspectiveEditor({ article, onSave, onCancel }: PerspectiveEditorProps) {
  const [content, setContent] = useState(article?.content || '');
  const [status, setStatus] = useState<'draft' | 'published'>(article?.status || 'draft');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(article);
  
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Handle drop cap formatting
   * Applies drop cap to the first letter of the current paragraph
   */
  const handleDropCap = () => {
    const quill = quillInstance.current;
    if (!quill) return;

    const selection = quill.getSelection();
    if (!selection) return;

    const [line, offset] = quill.getLine(selection.index);
    if (!line) return;

    // Get the start of the line
    const lineStart = selection.index - offset;
    const lineText = quill.getText(lineStart, line.length());
    
    // Find the first letter
    const match = lineText.match(/[A-Za-z]/);
    if (!match || match.index === undefined) return;

    const firstLetterIndex = lineStart + match.index;
    const format = quill.getFormat(firstLetterIndex, 1);
    
    // Toggle drop cap
    if (format['drop-cap']) {
      quill.formatText(firstLetterIndex, 1, 'drop-cap', false);
    } else {
      quill.formatText(firstLetterIndex, 1, 'drop-cap', true);
    }
    
    quill.setSelection(firstLetterIndex + 1, 0);
  };

  /**
   * Handle image upload
   * Compresses and uploads image to Supabase Storage
   */
  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const quill = quillInstance.current;
      if (!quill) return;

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

        // Insert image at cursor position
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, 'image', data.publicUrl);
        quill.setSelection(range.index + 1);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
      } finally {
        setUploading(false);
      }
    };
  };

  /**
   * Initialize Quill editor
   */
  useEffect(() => {
    if (!editorRef.current || quillInstance.current) return;

    // Pastel background colors
    const pastelColors = [
      '#FFF4E6', // Peach
      '#FFE4E1', // Pink
      '#E6F3FF', // Sky Blue
      '#F0FFF4', // Mint
      '#FFF0F5', // Lavender
      '#FFF8DC', // Cream
    ];

    // Initialize Quill with configuration
    const quill = new Quill(editorRef.current, {
      theme: 'snow',
      placeholder: 'Tell your story...',
      modules: {
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
            image: handleImageUpload,
            'drop-cap': handleDropCap,
          },
        },
      },
      formats: [
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
      ],
    });

    // Set initial content
    if (content) {
      quill.root.innerHTML = content;
    }

    // Listen to content changes
    quill.on('text-change', () => {
      setContent(quill.root.innerHTML);
    });

    quillInstance.current = quill;

    // Customize drop cap button icon
    setTimeout(() => {
      const dropCapBtn = document.querySelector('.ql-drop-cap');
      if (dropCapBtn) {
        dropCapBtn.innerHTML = `
          <svg viewBox="0 0 18 18" style="width: 18px; height: 18px;">
            <text x="1" y="14" font-size="14" font-weight="bold" fill="currentColor">A</text>
            <text x="9" y="16" font-size="7" fill="currentColor">a</text>
          </svg>
        `;
        dropCapBtn.setAttribute('title', 'Apply Drop Cap to First Letter');
      }
    }, 100);

    // Cleanup
    return () => {
      if (quillInstance.current) {
        quillInstance.current = null;
      }
    };
  }, []);

  /**
   * Handle fullscreen toggle
   */
  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await containerRef.current?.requestFullscreen();
        setFullscreen(true);
      } catch (err) {
        console.error('Error entering fullscreen:', err);
      }
    } else {
      try {
        await document.exitFullscreen();
        setFullscreen(false);
      } catch (err) {
        console.error('Error exiting fullscreen:', err);
      }
    }
  };

  /**
   * Listen for fullscreen changes
   */
  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  /**
   * Create a new article
   */
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

  /**
   * Save article changes
   */
  const handleSave = async () => {
    if (!currentArticle) {
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

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-white dark:bg-solarized-base03"
    >
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-50 bg-white dark:bg-solarized-base02">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-solarized-base0 hover:bg-slate-100 dark:hover:bg-solarized-base03 rounded-lg transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleFullscreen}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-solarized-base0 hover:bg-slate-100 dark:hover:bg-solarized-base03 rounded-lg transition-colors"
            >
              {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </button>
            <button
              onClick={() => {
                setStatus('draft');
                handleSave();
              }}
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-solarized-base0 hover:bg-slate-100 dark:hover:bg-solarized-base03 rounded-lg transition-colors disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              onClick={() => {
                setStatus('published');
                handleSave();
              }}
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-white bg-slate-900 dark:bg-solarized-blue hover:bg-slate-700 dark:hover:bg-solarized-cyan rounded-lg transition-colors disabled:opacity-50"
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
        
        <div className="quill-wrapper">
          <div ref={editorRef} />
        </div>
      </div>

      <style>{`
        :fullscreen, :-webkit-full-screen, :-moz-full-screen { overflow-y: auto; }

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
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 21px;
          line-height: 1.7;
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
        }

        .quill-wrapper .ql-editor h1, 
        .quill-wrapper .ql-editor h2, 
        .quill-wrapper .ql-editor h3 {
          font-family: Georgia, 'Times New Roman', serif;
        }

        .quill-wrapper .ql-editor h1 { font-size: 42px; font-weight: 700; line-height: 1.2; margin: 1.5em 0 0.5em; }
        .quill-wrapper .ql-editor h2 { font-size: 32px; font-weight: 600; line-height: 1.25; margin: 1.8em 0 0.6em; }
        .quill-wrapper .ql-editor h3 { font-size: 26px; font-weight: 600; line-height: 1.3; margin: 1.5em 0 0.5em; }
        .quill-wrapper .ql-editor p { margin: 1.5em 0; text-align: justify; }
        .quill-wrapper .ql-editor blockquote { border-left: 3px solid #1a1a1a; padding-left: 20px; margin: 1.8em 0; font-style: italic; opacity: 0.8; }
        .quill-wrapper .ql-editor pre { background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 1.8em 0; overflow-x: auto; }
        .quill-wrapper .ql-editor code { background: #f3f4f6; padding: 2px 6px; border-radius: 3px; font-family: Monaco, Menlo, monospace; font-size: 0.9em; }
        .quill-wrapper .ql-editor pre code { background: none; padding: 0; }

        .quill-wrapper .ql-editor ol, .quill-wrapper .ql-editor ul { padding-left: 30px !important; margin: 1.5em 0 !important; }
        .quill-wrapper .ql-editor ol { list-style-type: decimal !important; }
        .quill-wrapper .ql-editor ul { list-style-type: disc !important; }
        .quill-wrapper .ql-editor ol li, .quill-wrapper .ql-editor ul li { display: list-item !important; list-style-position: outside !important; padding-left: 0 !important; margin: 0.5em 0; }
        .quill-wrapper .ql-editor ol li { list-style-type: decimal !important; }
        .quill-wrapper .ql-editor ul li { list-style-type: disc !important; }
        .quill-wrapper .ql-editor ol li:before, .quill-wrapper .ql-editor ul li:before { display: none !important; }
        .quill-wrapper .ql-editor a { color: #2563eb; text-decoration: underline; }
        .quill-wrapper .ql-editor img { max-width: 100%; height: auto; margin: 2em 0; border-radius: 4px; }
        .quill-wrapper .ql-editor .drop-cap-letter { font-size: 5.5em; line-height: 0.85; float: left; margin: 0.05em 0.1em 0 0; font-weight: 400; display: inline-block; }
        .quill-wrapper .ql-editor .ql-align-left { text-align: left !important; }
        .quill-wrapper .ql-editor .ql-align-center { text-align: center !important; }
        .quill-wrapper .ql-editor .ql-align-right { text-align: right !important; }
        .quill-wrapper .ql-editor .ql-align-justify { text-align: justify !important; }

        .dark .quill-wrapper, .dark .quill-wrapper .ql-toolbar, .dark .quill-wrapper .ql-container, .dark .quill-wrapper .ql-editor { background: var(--solarized-base03) !important; }
        .dark .quill-wrapper .ql-toolbar { border-bottom-color: var(--solarized-base02) !important; }
        .dark .quill-wrapper .ql-editor { color: var(--solarized-base0) !important; }
        .dark .quill-wrapper .ql-editor.ql-blank::before { color: var(--solarized-base01) !important; }
        .dark .quill-wrapper .ql-editor h1, .dark .quill-wrapper .ql-editor h2, .dark .quill-wrapper .ql-editor h3 { color: var(--solarized-base1) !important; }
        .dark .quill-wrapper .ql-editor blockquote { border-left-color: var(--solarized-blue) !important; color: var(--solarized-base1) !important; }
        .dark .quill-wrapper .ql-editor pre, .dark .quill-wrapper .ql-editor code { background: var(--solarized-base02) !important; color: var(--solarized-base0) !important; }
        .dark .quill-wrapper .ql-editor a { color: var(--solarized-blue) !important; }
        .dark .quill-wrapper .ql-stroke { stroke: var(--solarized-base0) !important; }
        .dark .quill-wrapper .ql-fill { fill: var(--solarized-base0) !important; }
        .dark .quill-wrapper .ql-picker-label { color: var(--solarized-base0) !important; }
        .dark .quill-wrapper .ql-picker-options { background: var(--solarized-base02) !important; border-color: var(--solarized-base01) !important; }
        .dark .quill-wrapper .ql-picker-item:hover { background: var(--solarized-base02) !important; color: var(--solarized-base1) !important; }
        .dark .quill-wrapper .ql-toolbar button:hover, .dark .quill-wrapper .ql-toolbar button.ql-active { color: var(--solarized-blue) !important; }
        .dark .quill-wrapper .ql-toolbar button:hover .ql-stroke, .dark .quill-wrapper .ql-toolbar button.ql-active .ql-stroke { stroke: var(--solarized-blue) !important; }
        .dark .quill-wrapper .ql-toolbar button:hover .ql-fill, .dark .quill-wrapper .ql-toolbar button.ql-active .ql-fill { fill: var(--solarized-blue) !important; }
        .ql-drop-cap { width: auto !important; padding: 0 8px !important; }
      `}</style>
    </div>
  );
}
