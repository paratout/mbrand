import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState('');
  const [editName, setEditName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      const slug = newCategory.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const { error } = await supabase
        .from('categories')
        .insert({ name: newCategory.trim(), slug });

      if (error) throw error;
      setNewCategory('');
      fetchCategories();
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Failed to create category');
    }
  };

  const updateCategory = async (id: string) => {
    if (!editName.trim()) return;

    try {
      const slug = editName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const { error } = await supabase
        .from('categories')
        .update({ name: editName.trim(), slug })
        .eq('id', id);

      if (error) throw error;
      setEditing(null);
      setEditName('');
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Failed to update category');
    }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 dark:border-white"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Categories</h2>
        <p className="text-slate-600 dark:text-slate-400">Manage perspective categories</p>
      </div>

      {/* Add New Category */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Add New Category</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && createCategory()}
            placeholder="Category name"
            className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-slate-400 dark:focus:border-slate-500 transition-colors"
          />
          <button
            onClick={createCategory}
            className="px-6 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        {categories.length === 0 ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400">
            No categories yet. Add your first category above.
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {categories.map((category) => (
              <div key={category.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                {editing === category.id ? (
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && updateCategory(category.id)}
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-slate-500 transition-colors"
                      autoFocus
                    />
                    <button
                      onClick={() => updateCategory(category.id)}
                      className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditing(null);
                        setEditName('');
                      }}
                      className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-medium text-slate-900 dark:text-white">{category.name}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">{category.slug}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditing(category.id);
                          setEditName(category.name);
                        }}
                        className="px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCategory(category.id)}
                        className="px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
