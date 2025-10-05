# Image Assets Guide

This directory should contain all static assets for the website.

## Required Images

### General
- `favicon.svg` - Site favicon
- `og-image.jpg` - Default Open Graph image (1200x630px)

### Blog Images
Place blog post featured images in `public/blog/`:
- `enterprise-architecture.jpg` - Enterprise architecture article
- `cloud-migration.jpg` - Cloud migration article
- `mena-digital.jpg` - MENA digital transformation article
- `placeholder-blog.jpg` - Default blog post image

### Recommended Sizes
- **Blog featured images**: 1200x630px (16:9 aspect ratio)
- **OG images**: 1200x630px
- **Favicon**: SVG format (scalable)

## Image Optimization

Before adding images:
1. Compress images using tools like:
   - ImageOptim (Mac)
   - TinyPNG (Web)
   - Squoosh (Web)

2. Use appropriate formats:
   - **Photos**: WebP or JPEG
   - **Graphics/Logos**: SVG or PNG
   - **Icons**: SVG

3. Provide alt text in components for accessibility

## Creating Placeholder Images

For development, you can:
1. Use placeholder services like:
   - https://placehold.co/1200x630
   - https://via.placeholder.com/1200x630

2. Or create simple colored backgrounds with text overlays

## Example Structure

```
public/
├── favicon.svg
├── og-image.jpg
├── blog/
│   ├── enterprise-architecture.jpg
│   ├── cloud-migration.jpg
│   ├── mena-digital.jpg
│   └── placeholder-blog.jpg
└── IMAGES.md (this file)
```

## Notes

- All images in `public/` are served from the root URL
- Reference images in code as `/image-name.jpg` (starting with `/`)
- Keep file sizes under 500KB for optimal performance
- Use descriptive filenames (lowercase, hyphens instead of spaces)
