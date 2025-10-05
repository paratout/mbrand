export default function Seo({ 
  title = "Mehdi Bamou - Enterprise Architect & Digital Transformation Leader",
  description = "Enterprise Architect specializing in digital transformation, cloud strategy, and MENA market advisory. Bridging technology between Morocco and Europe.",
  ogImage = "/og-image.jpg",
  path = "/"
}) {
  const siteUrl = "https://mehdibamou.com";
  const fullUrl = `${siteUrl}${path}`;
  const fullImageUrl = `${siteUrl}${ogImage}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="UTF-8" />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Additional SEO */}
      <link rel="canonical" href={fullUrl} />
      <meta name="author" content="Mehdi Bamou" />
    </>
  );
}
