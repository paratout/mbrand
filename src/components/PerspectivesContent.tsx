import { useState, useEffect } from 'react';
import { supabase, type Article } from '../lib/supabase';

const categories = [
  { name: 'All', slug: 'all' },
  { name: 'AI & Machine Learning', slug: 'ai' },
  { name: 'Green Energy & ESG', slug: 'green-energy' },
  { name: 'Enterprise Architecture', slug: 'enterprise-architecture' },
  { name: 'Digital Transformation', slug: 'digital-transformation' },
  { name: 'Cloud Architecture', slug: 'cloud-architecture' },
];

export default function PerspectivesContent() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredArticles(articles);
    } else {
      const categoryName = categories.find(c => c.slug === activeCategory)?.name;
      setFilteredArticles(
        articles.filter(article => article.category === categoryName)
      );
    }
  }, [activeCategory, articles]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
      setFilteredArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

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
                key={category.slug}
                onClick={() => setActiveCategory(category.slug)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === category.slug
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-primary hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-spacing">
        <div className="container-custom">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-slate-600">
                No articles found in this category yet.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {filteredArticles.map((article) => (
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
                  <div className="mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                      {article.category}
                    </span>
                  </div>
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
          )}
        </div>
      </section>
    </>
  );
}
