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
      {/* Header - Improved */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                    Admin Dashboard
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {session.user.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {view !== 'list' && (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  ← Back
                </button>
              )}
              <button
                onClick={toggleDarkMode}
                className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
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
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
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
