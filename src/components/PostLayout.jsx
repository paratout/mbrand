export default function PostLayout({ 
  title, 
  date, 
  image = '/placeholder-blog.jpg',
  tags = [],
  children 
}) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className="container-custom section-spacing">
      {/* Header */}
      <header className="mb-12">
        {/* Featured Image */}
        <div className="relative overflow-hidden rounded-xl mb-8 h-96">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span 
                key={tag}
                className="text-sm bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-slate-900 dark:text-white">
          {title}
        </h1>

        {/* Date */}
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          {formattedDate}
        </p>
      </header>

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        {children}
      </div>

      {/* Author Bio */}
      <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
              MB
            </div>
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold mb-2 text-slate-900 dark:text-white">
              Mehdi Bamou
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Enterprise Architect specializing in digital transformation, cloud strategy, and MENA market advisory. 
              Bridging technology innovation between Morocco and Europe with over 15 years of experience in enterprise architecture.
            </p>
            <div className="mt-4">
              <a 
                href="/about" 
                className="text-primary dark:text-primary-400 font-semibold hover:underline"
              >
                Learn more about Mehdi →
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
