import { useState, useEffect } from 'react';
import { supabase, type Article } from '../../lib/supabase';
import AuthForm from './AuthForm.tsx';
import ArticleList from './ArticleList.tsx';
import ArticleEditor from './ArticleEditor.tsx';
import ArticleSEO from './ArticleSEO.tsx';

export default function AdminDashboard() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'edit' | 'create' | 'seo'>('list');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check system dark mode preference
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setView('list');
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setView('edit');
  };

  const handleSEO = (article: Article) => {
    setEditingArticle(article);
    setView('seo');
  };

  const handleCreate = () => {
    setEditingArticle(null);
    setView('create');
  };

  const handleBack = () => {
    setEditingArticle(null);
    setView('list');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen">
      {/* Header - Redesigned */}
      <header className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left side - Brand */}
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              MBrand
            </h1>

            {/* Right side - Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50 rounded-lg transition-all"
                title={darkMode ? 'Light mode' : 'Dark mode'}
              >
                {darkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              <div className="w-px h-6 bg-slate-300 dark:bg-slate-600"></div>
              <button
                onClick={handleSignOut}
                className="px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50 rounded-lg transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'list' && (
          <ArticleList onEdit={handleEdit} onSEO={handleSEO} onCreate={handleCreate} />
        )}
        {(view === 'edit' || view === 'create') && (
          <ArticleEditor
            article={editingArticle}
            onSave={handleBack}
            onCancel={handleBack}
          />
        )}
        {view === 'seo' && editingArticle && (
          <ArticleSEO
            article={editingArticle}
            onSave={handleBack}
            onCancel={handleBack}
          />
        )}
      </main>
    </div>
  );
}
