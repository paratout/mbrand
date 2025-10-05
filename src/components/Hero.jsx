export default function Hero({ 
  title, 
  subtitle, 
  backgroundImage = null, 
  ctaText = null, 
  ctaLink = null,
  secondaryCtaText = null,
  secondaryCtaLink = null,
  credentials = null
}) {
  const bgStyle = backgroundImage 
    ? { 
        backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.85), rgba(30, 58, 138, 0.85)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : { 
        background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 50%, #2563EB 100%)',
      };

  return (
    <section 
      className="relative py-28 md:py-40 text-white overflow-hidden"
      style={bgStyle}
    >
      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-64 h-64 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 border-2 border-white transform rotate-45"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 border-2 border-secondary rounded-lg"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl lg:text-3xl mb-6 leading-relaxed opacity-95 font-light">
              {subtitle}
            </p>
          )}
          {credentials && (
            <p className="text-sm md:text-base mb-10 opacity-80 font-medium tracking-wide">
              {credentials}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            {ctaText && ctaLink && (
              <a 
                href={ctaLink}
                className="inline-flex items-center justify-center bg-secondary hover:bg-secondary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 group"
                aria-label={`${ctaText} - Learn more about Mehdi Bamou's services`}
              >
                {ctaText}
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            )}
            {secondaryCtaText && secondaryCtaLink && (
              <a 
                href={secondaryCtaLink}
                className="inline-flex items-center justify-center border-2 border-white hover:bg-white hover:text-primary text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
                aria-label={`${secondaryCtaText} - Read Mehdi Bamou's background`}
              >
                {secondaryCtaText}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Animated gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-secondary via-primary to-secondary animate-pulse"></div>
    </section>
  );
}
