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
interface Toast {
  message: string;
  type: 'success' | 'error';
  link?: { url: string; text: string };
}

export default function PerspectiveEditor({ article, onSave, onCancel }: PerspectiveEditorProps) {
  const [content, setContent] = useState(article?.content || '');
  const [status, setStatus] = useState<'draft' | 'published'>(article?.status || 'draft');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(article);
  const [toast, setToast] = useState<Toast | null>(null);
  
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Show toast notification
   */
  const showToast = (message: string, type: 'success' | 'error', link?: { url: string; text: string }) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ message, type, link });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  /**
   * Save article with specific status
   */
  const saveWithStatus = async (saveStatus: 'draft' | 'published') => {
    if (!currentArticle) {
      showToast('No article loaded', 'error');
      return;
    }

    // Get current content directly from Quill to avoid stale closure
    const currentContent = quillInstance.current?.root.innerHTML || content;

    try {
      setSaving(true);
      
      const { error } = await supabase
        .from('articles')
        .update({
          content: currentContent,
          status: saveStatus,
          updated_at: new Date().toISOString(),
          ...(saveStatus === 'published' && !currentArticle.published_at && {
            published_at: new Date().toISOString(),
          }),
        })
        .eq('id', currentArticle.id);

      if (error) throw error;
      
      setStatus(saveStatus);
      const message = saveStatus === 'published' ? 'Article published successfully!' : 'Draft saved successfully!';
      const link = saveStatus === 'published' && currentArticle?.slug 
        ? { url: `/perspectives/${currentArticle.slug}`, text: 'View Article' }
        : undefined;
      
      showToast(message, 'success', link);
      // Don't call onSave() - keep user in editor to see toast
    } catch (error: any) {
      showToast(error.message || 'Failed to save', 'error');
    } finally {
      setSaving(false);
    }
  };

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
      '#F3E5F5', // Light Purple
      '#E8F5E9', // Light Green
      '#FFF9C4', // Light Yellow
      '#FFE0B2', // Light Orange
      '#F5F5F5', // Light Gray
      '#E1F5FE', // Light Cyan
    ];

    // Initialize Quill with configuration
    const quill = new Quill(editorRef.current, {
      theme: 'snow',
      placeholder: 'Tell your story...',
      modules: {
        toolbar: {
          container: [
            ['back'],
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline'],
            [{ align: [] }],
            [{ background: pastelColors }],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['drop-cap'],
            ['clean'],
            ['fullscreen', 'save-draft', 'publish'],
          ],
          handlers: {
            image: handleImageUpload,
            'drop-cap': handleDropCap,
            'fullscreen': toggleFullscreen,
            'save-draft': () => saveWithStatus('draft'),
            'publish': () => saveWithStatus('published'),
            'back': onCancel,
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

    // Prevent toolbar from stealing focus/selection
    const toolbar = containerRef.current?.querySelector('.ql-toolbar');
    if (toolbar) {
      toolbar.addEventListener('mousedown', (e) => {
        e.preventDefault();
      });
    }

    // Customize toolbar buttons
    setTimeout(() => {
      // Drop cap button
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

      // Back button
      const backBtn = document.querySelector('.ql-back');
      if (backBtn) {
        backBtn.innerHTML = `
          <svg viewBox="0 0 18 18" style="width: 18px; height: 18px;">
            <path d="M11 5L6 9l5 4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `;
        backBtn.setAttribute('title', 'Back to List');
      }

      // Fullscreen button
      const fullscreenBtn = document.querySelector('.ql-fullscreen');
      if (fullscreenBtn) {
        fullscreenBtn.innerHTML = `
          <svg viewBox="0 0 18 18" style="width: 18px; height: 18px;">
            <path d="M2 7V2h5M16 7V2h-5M16 11v5h-5M2 11v5h5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `;
        fullscreenBtn.setAttribute('title', 'Toggle Fullscreen');
        fullscreenBtn.classList.add('ql-action-icon');
      }

      // Save Draft button - Floppy disk icon
      const saveDraftBtn = document.querySelector('.ql-save-draft');
      if (saveDraftBtn) {
        saveDraftBtn.innerHTML = `
          <svg viewBox="0 0 18 18" style="width: 18px; height: 18px;">
            <path d="M14.5 2h-11C2.67 2 2 2.67 2 3.5v11c0 .83.67 1.5 1.5 1.5h11c.83 0 1.5-.67 1.5-1.5v-11c0-.83-.67-1.5-1.5-1.5z" fill="none" stroke="#f59e0b" stroke-width="1.2"/>
            <path d="M5 2v4h6V2M11 16v-5H7v5" fill="none" stroke="#f59e0b" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            <rect x="7" y="11" width="4" height="1" fill="#f59e0b"/>
          </svg>
        `;
        saveDraftBtn.setAttribute('title', 'Save as Draft');
        saveDraftBtn.classList.add('ql-action-icon');
      }

      // Publish button - Paper airplane icon
      const publishBtn = document.querySelector('.ql-publish');
      if (publishBtn) {
        publishBtn.innerHTML = `
          <svg viewBox="0 0 18 18" style="width: 18px; height: 18px;">
            <path d="M16 2L2 9l5 2 1 5 2-3 4 2L16 2z" fill="none" stroke="#10b981" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 11l5-5" stroke="#10b981" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
        `;
        publishBtn.setAttribute('title', 'Publish Article');
        publishBtn.classList.add('ql-action-icon');
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
   * Cleanup toast timeout on unmount
   */
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-white overflow-y-auto"
    >
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 animate-slide-in ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`} style={{ zIndex: 9999 }}>
          <div className="flex items-center gap-3">
            {toast.type === 'success' ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span className="font-medium">{toast.message}</span>
          </div>
          {toast.link && (
            <a
              href={toast.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-sm font-medium transition-colors"
            >
              {toast.link.text} →
            </a>
          )}
          <button
            onClick={() => setToast(null)}
            className="ml-2 hover:opacity-75 transition-opacity"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Editor Container */}
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-12 h-full">
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
          position: fixed;
          top: 60px;
          left: 50%;
          transform: translateX(-50%);
          max-width: 1280px;
          width: calc(100% - 2rem);
          z-index: 1;
          background: white;
          border: none;
          border-bottom: 1px solid #e5e7eb;
          padding: 12px;
          border-radius: 0;
          display: flex;
          align-items: center;
        }
        
        /* Prevent toolbar buttons from stealing focus */
        .quill-wrapper .ql-toolbar button {
          user-select: none;
        }
        .quill-wrapper .ql-toolbar button:focus {
          outline: none;
        }
        
        /* Add padding to editor to account for fixed toolbar */
        .quill-wrapper .ql-container {
          margin-top: 60px;
        }

        .quill-wrapper .ql-toolbar .ql-formats {
          margin-right: 15px !important;
        }

        /* Push last group to the right */
        .quill-wrapper .ql-toolbar .ql-formats:last-child {
          margin-left: auto;
          margin-right: 0 !important;
        }

        /* Custom action icon styles */
        .ql-action-icon {
          transition: all 0.2s !important;
        }

        .ql-action-icon:hover {
          transform: scale(1.1);
        }

        .ql-toolbar button.ql-back {
          margin-right: 8px;
        }

        .quill-wrapper .ql-container {
          border: none;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 21px;
          line-height: 1.7;
          background: white;
          margin-top: 0;
          padding-top: 0;
        }

        /* Disable saving state visual feedback */
        .ql-toolbar button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Toast animation */
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }

        .quill-wrapper .ql-editor {
          padding: 0;
          min-height: 60vh;
          color: #1a1a1a;
          background: white !important;
        }
        
        /* Dark selection background with light text */
        .quill-wrapper .ql-editor ::selection {
          background: #1a1a1a;
          color: #ffffff;
        }
        .quill-wrapper .ql-editor ::-moz-selection {
          background: #1a1a1a;
          color: #ffffff;
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
        .quill-wrapper .ql-editor h4 { font-size: 21px; font-weight: 600; line-height: 1.3; margin: 1.5em 0 0.5em; }
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
        .quill-wrapper .ql-editor .ql-align-center { text-align: center !important; display: block !important; }
        .quill-wrapper .ql-editor .ql-align-right { text-align: right !important; display: block !important; }
        .quill-wrapper .ql-editor .ql-align-justify { text-align: justify !important; }
        
        /* Image alignment support - works when image is in aligned paragraph */
        .quill-wrapper .ql-editor .ql-align-center img,
        .quill-wrapper .ql-editor img.ql-align-center { 
          display: block !important; 
          margin-left: auto !important; 
          margin-right: auto !important; 
        }
        .quill-wrapper .ql-editor .ql-align-right img,
        .quill-wrapper .ql-editor img.ql-align-right { 
          display: block !important; 
          margin-left: auto !important; 
          margin-right: 0 !important; 
        }
        .quill-wrapper .ql-editor .ql-align-left img,
        .quill-wrapper .ql-editor img.ql-align-left { 
          display: block !important; 
          margin-left: 0 !important; 
          margin-right: auto !important; 
        }
        .ql-drop-cap { width: auto !important; padding: 0 8px !important; }
      `}</style>
    </div>
  );
}
