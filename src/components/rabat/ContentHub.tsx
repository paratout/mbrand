import { useState, useEffect } from 'react';
import { supabase, type Article } from '../../lib/supabase';
import AuthForm from './AuthForm';
import Today from './Today';
import PerspectivesList from './PerspectivesList';
import PerspectiveEditor from './PerspectiveEditor';
import PerspectiveSEO from './PerspectiveSEO';
import CategoriesPage from './CategoriesPage';

export default function ContentHub() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<'today' | 'perspectives' | 'categories'>('today');
  const [view, setView] = useState<'list' | 'edit' | 'create' | 'seo'>('list');
  const [editingPerspective, setEditingPerspective] = useState<Article | null>(null);
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

  const handleEdit = (perspective: Article) => {
    setEditingPerspective(perspective);
    setView('edit');
    setCurrentPage('perspectives');
  };

  const handleSEO = (perspective: Article) => {
    setEditingPerspective(perspective);
    setView('seo');
    setCurrentPage('perspectives');
  };

  const handleCreate = () => {
    setEditingPerspective(null);
    setView('create');
    setCurrentPage('perspectives');
  };

  const handleBack = () => {
    setEditingPerspective(null);
    setView('list');
  };

  const handleManageCategories = () => {
    setCurrentPage('categories');
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
    <div className="min-h-screen bg-white dark:bg-solarized-base03">
      {/* Header - Redesigned with Solarized Dark */}
      <header className="bg-slate-50 dark:bg-solarized-base02 border-b border-slate-200 dark:border-solarized-base01 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            {/* Left side - Brand */}
            <button
              onClick={() => {
                setCurrentPage('today');
                setView('list');
              }}
              className="text-xl font-bold text-slate-900 dark:text-solarized-base1 hover:text-slate-700 dark:hover:text-solarized-blue transition-colors"
            >
              MBrand
            </button>

            {/* Right side - Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCurrentPage('perspectives');
                  setView('list');
                }}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  currentPage === 'perspectives'
                    ? 'bg-slate-900 dark:bg-solarized-base01 text-white dark:text-solarized-base1'
                    : 'text-slate-600 dark:text-solarized-base0 hover:bg-slate-100 dark:hover:bg-solarized-base03'
                }`}
              >
                Perspectives
              </button>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-solarized-base0 hover:bg-slate-100 dark:hover:bg-solarized-base03 rounded-lg transition-all flex items-center gap-2"
              >
                Public
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <div className="w-px h-6 bg-slate-300 dark:bg-solarized-base01"></div>
              <button
                onClick={toggleDarkMode}
                className="p-2 text-slate-600 dark:text-solarized-base0 hover:bg-white/50 dark:hover:bg-solarized-base03 rounded-lg transition-all"
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
              <div className="w-px h-6 bg-slate-300 dark:bg-solarized-base01"></div>
              <button
                onClick={handleSignOut}
                className="px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-solarized-base0 hover:bg-white/50 dark:hover:bg-solarized-base03 rounded-lg transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'list' && currentPage === 'today' && (
          <Today />
        )}
        {view === 'list' && currentPage === 'perspectives' && (
          <PerspectivesList 
            onEdit={handleEdit} 
            onSEO={handleSEO} 
            onCreate={handleCreate}
            onManageCategories={handleManageCategories}
          />
        )}
        {view === 'list' && currentPage === 'categories' && (
          <CategoriesPage />
        )}
        {(view === 'edit' || view === 'create') && (
          <PerspectiveEditor
            article={editingPerspective}
            onSave={handleBack}
            onCancel={handleBack}
          />
        )}
        {view === 'seo' && editingPerspective && (
          <PerspectiveSEO
            perspective={editingPerspective}
            onSave={handleBack}
            onCancel={handleBack}
          />
        )}
      </main>
    </div>
  );
}
