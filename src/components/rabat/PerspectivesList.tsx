import { useState, useEffect } from 'react';
import { supabase, type Article } from '../../lib/supabase';

interface PerspectivesListProps {
  onEdit: (perspective: Article) => void;
  onSEO: (perspective: Article) => void;
  onCreate: () => void;
  onManageCategories: () => void;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function PerspectivesList({ onEdit, onSEO, onCreate, onManageCategories }: PerspectivesListProps) {
  const [perspectives, setPerspectives] = useState<Article[]>([]);
  const [allPerspectives, setAllPerspectives] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  useEffect(() => {
    fetchPerspectives();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterPerspectives();
  }, [filter, searchQuery, selectedCategories, allPerspectives]);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (!error && data) {
      setCategories(data);
    }
  };

  const fetchPerspectives = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAllPerspectives(data || []);
      setPerspectives(data || []);
    } catch (error) {
      console.error('Error fetching perspectives:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPerspectives = () => {
    let filtered = [...allPerspectives];

    // Filter by status
    if (filter !== 'all') {
      filtered = filtered.filter(p => p.status === filter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.excerpt?.toLowerCase().includes(query)
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => 
        p.category && selectedCategories.includes(p.category)
      );
    }

    setPerspectives(filtered);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this perspective?')) return;

    try {
      const { error } = await supabase.from('articles').delete().eq('id', id);

      if (error) throw error;
      fetchPerspectives();
    } catch (error) {
      console.error('Error deleting perspective:', error);
      alert('Failed to delete perspective');
    }
  };

  const toggleStatus = async (perspective: Article) => {
    const newStatus = perspective.status === 'published' ? 'draft' : 'published';
    
    try {
      const { error } = await supabase
        .from('articles')
        .update({ 
          status: newStatus,
          ...(newStatus === 'published' && !perspective.published_at && {
            published_at: new Date().toISOString()
          })
        })
        .eq('id', perspective.id);

      if (error) throw error;
      fetchPerspectives();
    } catch (error) {
      console.error('Error toggling status:', error);
      alert('Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Perspectives</h2>
          <p className="text-slate-600 mt-1">Manage your perspectives</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onManageCategories}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-300 transition-colors"
          >
            Manage Categories
          </button>
          <button
            onClick={onCreate}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-300 transition-colors"
          >
            New Perspective
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Status Filters */}
        <div className="flex gap-2">
          {(['all', 'published', 'draft'] as const).map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                filter === filterOption
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search perspectives..."
            className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 transition-colors"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <button
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-300 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Categories
            {selectedCategories.length > 0 && (
              <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                {selectedCategories.length}
              </span>
            )}
          </button>

          {showCategoryDropdown && (
            <div className="absolute top-full mt-2 right-0 w-64 bg-white rounded-lg border border-slate-200 shadow-lg z-10">
              <div className="p-3 max-h-64 overflow-y-auto">
                {categories.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-2">
                    No categories available
                  </p>
                ) : (
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label
                        key={category.id}
                        className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.name)}
                          onChange={() => toggleCategory(category.name)}
                          className="w-4 h-4 rounded border-slate-300"
                        />
                        <span className="text-sm text-slate-900">{category.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Perspectives List */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        {perspectives.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No perspectives found. Create your first one!
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {perspectives.map((perspective) => (
              <div key={perspective.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {perspective.title}
                    </h3>
                    {perspective.excerpt && (
                      <p className="text-slate-600 text-sm mb-3">
                        {perspective.excerpt}
                      </p>
                    )}
                    <div className="flex items-center flex-wrap gap-2 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        perspective.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {perspective.status}
                      </span>
                      {perspective.category && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                          {perspective.category}
                        </span>
                      )}
                      {perspective.read_time && (
                        <span className="text-slate-500">
                          {perspective.read_time}
                        </span>
                      )}
                      <span className="text-slate-500">
                        {new Date(perspective.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {perspective.status === 'published' && (
                      <a
                        href={`/perspectives/${perspective.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        title="View perspective"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    <button
                      onClick={() => toggleStatus(perspective)}
                      className={`p-2 rounded-lg transition-colors ${
                        perspective.status === 'published'
                          ? 'text-green-600 hover:bg-green-50'
                          : 'text-yellow-600 hover:bg-yellow-50'
                      }`}
                      title={perspective.status === 'published' ? 'Set to draft' : 'Publish'}
                    >
                      {perspective.status === 'published' ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={() => onEdit(perspective)}
                      className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Edit content"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onSEO(perspective)}
                      className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Settings"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(perspective.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
