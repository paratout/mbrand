import { useState, useEffect } from 'react';
import { supabase, type Article } from '../lib/supabase';

interface Category {
  name: string;
  count: number;
}

const ARTICLES_PER_PAGE = 6;

export default function PerspectivesContent() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [activeCategory, currentPage]);

  const fetchCategories = async () => {
    try {
      // Get all published articles to count by category
      const { data, error } = await supabase
        .from('articles')
        .select('category')
        .eq('status', 'published');

      if (error) throw error;

      // Count articles per category (handle array of categories)
      const categoryCounts: Record<string, number> = {};
      let totalArticles = 0;
      data?.forEach(article => {
        if (article.category && Array.isArray(article.category)) {
          totalArticles++;
          article.category.forEach((cat: string) => {
            categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
          });
        }
      });

      // Create category list with counts
      const categoryList: Category[] = [
        { name: 'All', count: totalArticles },
        ...Object.entries(categoryCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count) // Sort by count descending
      ];

      setCategories(categoryList);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchArticles = async () => {
    try {
      setLoading(true);
      
      // Build query
      let query = supabase
        .from('articles')
        .select('*', { count: 'exact' })
        .eq('status', 'published');

      // Apply category filter (check if category array contains the selected category)
      if (activeCategory !== 'All') {
        query = query.contains('category', [activeCategory]);
      }

      // Apply pagination
      const from = (currentPage - 1) * ARTICLES_PER_PAGE;
      const to = from + ARTICLES_PER_PAGE - 1;

      const { data, error, count } = await query
        .order('published_at', { ascending: false })
        .range(from, to);

      if (error) throw error;
      
      setArticles(data || []);
      setTotalArticles(count || 0);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (categoryName: string) => {
    setActiveCategory(categoryName);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      {/* Categories Filter */}
      <section className="py-8 bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategoryChange(category.name)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === category.name
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-primary hover:text-white'
                }`}
              >
                {category.name}
                <span className="ml-2 opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-spacing">
        <div className="container-custom">
          {articles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-slate-600">
                No articles found in this category yet.
              </p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-8">
                {articles.map((article) => (
                <a
                  key={article.id}
                  href={`/perspectives/${article.slug}`}
                  className="card hover:shadow-xl transition-all hover:-translate-y-1 group block"
                >
                  {article.cover_image && (
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <img
                        src={article.cover_image}
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  )}
                  {article.category && article.category.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {article.category.map((cat) => (
                        <span key={cat} className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                  <h3 className="text-2xl font-heading font-bold mb-3 text-slate-900 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-slate-600 mb-4">
                      {article.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {new Date(article.published_at || article.created_at).toLocaleDateString()}
                    </span>
                    {article.read_time && (
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {article.read_time}
                      </span>
                    )}
                  </div>
                </a>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage(p => p - 1)}
                    disabled={!hasPrevPage}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and pages around current
                      const showPage = 
                        page === 1 || 
                        page === totalPages || 
                        (page >= currentPage - 1 && page <= currentPage + 1);
                      
                      const showEllipsis = 
                        (page === currentPage - 2 && currentPage > 3) ||
                        (page === currentPage + 2 && currentPage < totalPages - 2);

                      if (showEllipsis) {
                        return <span key={page} className="px-2 text-slate-400">...</span>;
                      }

                      if (!showPage) return null;

                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === page
                              ? 'bg-primary text-white'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage(p => p + 1)}
                    disabled={!hasNextPage}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
