export default function ArticlePreview({ 
  slug,
  title, 
  excerpt, 
  date, 
  image = '/placeholder-blog.jpg',
  tags = [] 
}) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className="card group">
      <a href={`/blog/${slug}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden rounded-lg mb-4 h-48">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div>
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span 
                  key={tag}
                  className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-heading font-bold mb-2 text-slate-900 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Date */}
          <p className="text-sm text-slate-500 mb-3">
            {formattedDate}
          </p>

          {/* Excerpt */}
          <p className="text-slate-600 line-clamp-3">
            {excerpt}
          </p>

          {/* Read More */}
          <div className="mt-4 text-primary font-semibold group-hover:underline">
            Read more →
          </div>
        </div>
      </a>
    </article>
  );
}
