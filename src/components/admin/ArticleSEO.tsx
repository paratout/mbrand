import { useState, useEffect } from 'react';
import slugify from 'slugify';
import { supabase, type Article } from '../../lib/supabase';

interface ArticleSEOProps {
  article: Article;
  onSave: () => void;
  onCancel: () => void;
}

const categories = [
  'AI & Machine Learning',
  'Green Energy & ESG',
  'Enterprise Architecture',
  'Digital Transformation',
  'Cloud Architecture',
];

export default function ArticleSEO({ article, onSave, onCancel }: ArticleSEOProps) {
  const [title, setTitle] = useState(article.title);
  const [slug, setSlug] = useState(article.slug);
  const [excerpt, setExcerpt] = useState(article.excerpt || '');
  const [category, setCategory] = useState(article.category);
  const [readTime, setReadTime] = useState(article.read_time || '');
  const [coverImage, setCoverImage] = useState(article.cover_image || '');
  const [saving, setSaving] = useState(false);

  // Auto-generate slug from title
  useEffect(() => {
    if (title && title !== article.title) {
      setSlug(slugify(title, { lower: true, strict: true }));
    }
  }, [title, article.title]);

  const handleSave = async () => {
    if (!title || !slug) {
      alert('Title and slug are required');
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
          category,
          read_time: readTime || null,
          cover_image: coverImage || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', article.id);

      if (error) throw error;
      onSave();
    } catch (error) {
      console.error('Error updating article SEO:', error);
      alert('Failed to update article SEO');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">SEO & Metadata</h2>
              <p className="text-blue-100">Edit article information and settings</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 text-sm font-medium bg-white text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 font-semibold"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Article Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article title"
              className="w-full px-4 py-3 text-xl font-semibold rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              URL Slug *
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="article-url-slug"
              className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors font-mono text-sm"
            />
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              <span className="font-medium">Preview:</span> /perspectives/{slug}
            </p>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief description for article cards and SEO"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors resize-none"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {excerpt.length} characters (recommended: 120-160)
            </p>
          </div>

          {/* Category and Read Time */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Read Time
              </label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="5 min read"
                className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Cover Image URL
            </label>
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
            />
            {coverImage && (
              <div className="mt-4">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Preview:</p>
                <div className="relative">
                  <img
                    src={coverImage}
                    alt="Cover preview"
                    className="w-full max-w-2xl h-64 object-cover rounded-lg border-2 border-slate-200 dark:border-slate-700"
                  />
                  <button
                    onClick={() => setCoverImage('')}
                    className="absolute top-2 right-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-blue-900 dark:text-blue-100">
                <p className="font-medium mb-1">SEO Tips:</p>
                <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                  <li>• Keep titles under 60 characters for best SEO</li>
                  <li>• Use descriptive, keyword-rich slugs</li>
                  <li>• Write compelling excerpts (120-160 characters)</li>
                  <li>• Use high-quality cover images (1200x630px recommended)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
