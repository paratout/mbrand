import { useState, useEffect } from 'react';
import slugify from 'slugify';
import imageCompression from 'browser-image-compression';
import { supabase, type Article } from '../../lib/supabase';

interface PerspectiveSEOProps {
  perspective: Article;
  onSave: () => void;
  onCancel: () => void;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function PerspectiveSEO({ perspective, onSave, onCancel }: PerspectiveSEOProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState(perspective.title);
  const [slug, setSlug] = useState(perspective.slug);
  const [excerpt, setExcerpt] = useState(perspective.excerpt || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    perspective.category ? [perspective.category] : []
  );
  const [readTime, setReadTime] = useState(perspective.read_time || '');
  const [coverImage, setCoverImage] = useState(perspective.cover_image || '');
  const [publishedAt, setPublishedAt] = useState(
    perspective.published_at ? new Date(perspective.published_at).toISOString().slice(0, 16) : ''
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Fetch categories from database
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (!error && data) {
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);

  // Auto-generate slug from title
  useEffect(() => {
    if (title && title !== perspective.title) {
      setSlug(slugify(title, { lower: true, strict: true }));
    }
  }, [title, perspective.title]);

  const uploadCoverImage = async (file: File) => {
    try {
      setUploading(true);

      // Compress image
      const compressedFile = await imageCompression(file, {
        maxWidthOrHeight: 1200,
        useWebWorker: true,
        fileType: 'image/webp',
      });

      // Generate unique filename
      const fileName = `cover-${Date.now()}.webp`;

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

      setCoverImage(data.publicUrl);
    } catch (error) {
      console.error('Error uploading cover image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadCoverImage(file);
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSave = async () => {
    if (!title || !slug) {
      alert('Title and slug are required');
      return;
    }

    if (selectedCategories.length === 0) {
      alert('Please select at least one category');
      return;
    }

    try {
      setSaving(true);
      const { error } = await supabase
        .from('articles')
        .update({
          title,
          slug,
          excerpt: excerpt || null,
          category: selectedCategories[0], // Primary category
          read_time: readTime || null,
          cover_image: coverImage || null,
          published_at: publishedAt ? new Date(publishedAt).toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', perspective.id);

      if (error) throw error;
      onSave();
    } catch (error) {
      console.error('Error updating perspective:', error);
      alert('Failed to update perspective');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Article Settings</h2>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-300 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article title"
              className="w-full px-4 py-3 text-2xl font-bold rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 transition-colors"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              URL Slug
            </label>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900">
              <span className="text-sm text-slate-500">/perspectives/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="article-url-slug"
                className="flex-1 bg-white text-slate-900 placeholder-slate-400 focus:outline-none font-mono text-sm"
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => toggleCategory(category.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategories.includes(category.name)
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Read Time and Publication Date */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Read Time
              </label>
              <select
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-slate-400 transition-colors"
              >
                <option value="">Select read time</option>
                {[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25].map((minutes) => (
                  <option key={minutes} value={`${minutes} min read`}>
                    {minutes} min read
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Publication Date
              </label>
              <input
                type="datetime-local"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-slate-400 transition-colors"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A brief description of your article..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 transition-colors resize-none"
            />
            <p className="text-xs text-slate-500 mt-2">
              {excerpt.length} characters
            </p>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Cover Image
            </label>
            {coverImage ? (
              <div className="relative group">
                <img
                  src={coverImage}
                  alt="Cover"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-3">
                  <label className="px-4 py-2 bg-white text-slate-900 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                    Change
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                  <button
                    onClick={() => setCoverImage('')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <label className="block w-full h-64 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 transition-colors cursor-pointer">
                <div className="h-full flex flex-col items-center justify-center text-slate-500">
                  {uploading ? (
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
                      <p>Uploading...</p>
                    </div>
                  ) : (
                    <>
                      <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm font-medium">Click to upload cover image</p>
                      <p className="text-xs mt-1">Recommended: 1200x630px</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
