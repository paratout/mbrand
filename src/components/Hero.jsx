export default function Hero({ 
  title, 
  subtitle, 
  backgroundImage = null, 
  ctaText = null, 
  ctaLink = null 
}) {
  const bgStyle = backgroundImage 
    ? { 
        backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.8), rgba(30, 58, 138, 0.8)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : { backgroundColor: '#1E3A8A' };

  return (
    <section 
      className="relative py-24 md:py-32 text-white"
      style={bgStyle}
    >
      <div className="container-custom">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
              {subtitle}
            </p>
          )}
          {ctaText && ctaLink && (
            <a 
              href={ctaLink}
              className="inline-block bg-secondary hover:bg-secondary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
            >
              {ctaText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
