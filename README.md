# Mehdi Bamou - Professional Portfolio

A professional portfolio and thought leadership platform built with Astro, React, and Tailwind CSS.

## Overview

This website serves as a professional portfolio showcasing expertise in enterprise architecture, digital transformation, and cross-cultural technology leadership. It focuses on knowledge sharing and thought leadership rather than client acquisition.

## Tech Stack

- **Astro v4** - Static site generator with server-side rendering
- **React** - Interactive components
- **Tailwind CSS** - Utility-first CSS framework
- **Cloudflare Pages** - Deployment platform
- **MDX** - Markdown with JSX for blog posts

## Features

- ✅ **Dark Mode** - System preference detection with manual toggle
- ✅ **Multilanguage** - Infrastructure for EN, FR, AR, DE
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **SEO Optimized** - Proper meta tags and semantic HTML
- ✅ **Blog/Perspectives** - Content management with Astro collections
- ✅ **Portfolio Showcase** - Projects and technical contributions
- ✅ **Research Section** - Publications and academic work
- ✅ **Media Library** - Professional photos and presentations

## Site Structure

```
/                   - Homepage
/perspectives       - Blog/articles
/portfolio          - Projects and code
/speaking           - Conference talks and events
/research           - Publications and research
/media              - Media library (photos, presentations, videos)
/about              - Professional background
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   ```
   http://localhost:4321
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run astro` - Run Astro CLI commands

## Development

### Adding Blog Posts

Create a new `.md` or `.mdx` file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "Brief description"
date: 2024-01-01
tags: ["Tag1", "Tag2"]
draft: false
---

Your content here...
```

### Dark Mode

Dark mode is automatically enabled based on system preferences. Users can toggle manually using the button in the navigation.

### Multilanguage

Language switcher is available in the navigation. Full i18n routing can be implemented using Astro's i18n features.

## Deployment

### Cloudflare Pages

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy:**
   ```bash
   wrangler pages deploy dist
   ```

### GitHub Actions

Automatic deployment is configured via `.github/workflows/deploy.yml`. Push to `main` branch to trigger deployment.

## Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── DarkModeToggle.jsx
│   │   ├── LanguageSwitcher.jsx
│   │   ├── Nav.jsx
│   │   └── ...
│   ├── content/         # Content collections
│   │   └── blog/        # Blog posts
│   ├── layouts/         # Page layouts
│   │   └── BaseLayout.astro
│   ├── pages/           # Routes
│   │   ├── index.astro
│   │   ├── perspectives.astro
│   │   ├── portfolio.astro
│   │   ├── research.astro
│   │   ├── media.astro
│   │   ├── speaking.astro
│   │   └── about.astro
│   └── styles/          # Global styles
│       └── global.css
├── astro.config.mjs     # Astro configuration
├── tailwind.config.cjs  # Tailwind configuration
└── package.json
```

## License

Copyright © 2024 Mehdi Bamou. All rights reserved.
