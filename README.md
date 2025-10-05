# Mehdi Bamou - Professional Portfolio

<div align="center">

![Astro](https://img.shields.io/badge/Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![MDX](https://img.shields.io/badge/MDX-1B1F24?style=for-the-badge&logo=mdx&logoColor=white)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/paratout/mbrand)

</div>

---

## 📖 Overview

A professional portfolio and thought leadership platform showcasing expertise in enterprise architecture, digital transformation, and cross-cultural technology leadership. Built with modern web technologies and focused on knowledge sharing rather than client acquisition.

**Key Focus Areas:**
- 🏗️ Enterprise Architecture & TOGAF
- ☁️ Cloud Architecture & Migration
- 🌍 Digital Transformation (Europe & MENA)
- 🔬 Research & Publications
- 🎤 Speaking & Conferences

## 🚀 Tech Stack

- **[Astro](https://astro.build)** - Modern static site generator with server-side rendering
- **[React](https://react.dev)** - Interactive UI components
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Cloudflare Pages](https://pages.cloudflare.com)** - Edge deployment platform
- **[MDX](https://mdxjs.com)** - Markdown with JSX for rich content

## ✨ Features

### Core Features
- 🌓 **Dark Mode** - System preference detection with manual toggle, persistent across sessions
- 🌐 **Multilanguage (i18n)** - Full support for EN, FR, AR, DE with Astro's built-in routing
- 📱 **Fully Responsive** - Mobile-first design, optimized for all devices
- 🔍 **SEO Optimized** - Proper meta tags, semantic HTML, and Open Graph support
- ⚡ **Performance** - Static site generation with edge deployment on Cloudflare
- ♿ **Accessible** - WCAG compliant with proper ARIA labels

### Design System
- 🎨 **Animated Mesh Backgrounds** - Beautiful gradient blob animations on all hero sections
- 💎 **Glass Morphism** - Frosted glass effects for active navigation states
- 🎭 **Unique Color Identity** - Each section has its own pastel color variant
- 🔄 **Smooth Transitions** - Professional animations throughout
- 📐 **Consistent Layout** - Unified design language across all pages

### Content Sections
- 📝 **Perspectives** - Blog/articles on enterprise architecture and digital transformation
- 💼 **Portfolio** - Technical projects and code contributions
- 🎤 **Speaking** - Conference talks, workshops, and keynotes
- 🔬 **Research** - Publications, white papers, and academic work
- 📸 **Media Library** - Professional photos, presentations, and videos
- 👤 **About** - Professional background and credentials

### Developer Features
- 🚧 **Coming Soon Mode** - Toggle to show/hide full site during development
- 🔧 **Centralized Config** - Easy site configuration in `src/config/site.js`
- 📦 **Component Library** - Reusable React components
- 🎯 **Active Navigation** - Automatic highlighting of current page
- 🌍 **i18n Ready** - Translation infrastructure with helper functions

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

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/paratout/mbrand.git
   cd mbrand
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   ```
   http://localhost:4321
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run astro` - Run Astro CLI commands

## 🔧 Configuration

### Coming Soon Mode

Toggle between "Coming Soon" page and full website:

**File:** `src/config/site.js`
```javascript
export const siteConfig = {
  comingSoonMode: false,  // Set to true to enable coming soon page
  // ... other config
};
```

- `true` = All traffic redirected to beautiful animated landing page
- `false` = Full website accessible

Perfect for work-in-progress or pre-launch phases.

### Site Configuration

Edit `src/config/site.js` to customize:
```javascript
export const siteConfig = {
  comingSoonMode: false,
  title: 'Mehdi Bamou',
  description: 'Enterprise Architect & Technology Leader',
  email: 'mehdi.bamou@example.com',
  social: {
    linkedin: 'https://linkedin.com/in/mehdibamou',
    github: 'https://github.com/mehdibamou',
    // ... more links
  }
};
```

### Internationalization (i18n)

The site supports 4 languages with Astro's built-in i18n routing:

**Configured in:** `astro.config.mjs`
```javascript
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'fr', 'ar', 'de'],
  routing: {
    prefixDefaultLocale: false  // English has no prefix
  }
}
```

**URL Structure:**
- English (default): `/about`, `/portfolio`
- French: `/fr/about`, `/fr/portfolio`
- Arabic: `/ar/about` (RTL support)
- German: `/de/about`

**Translations:** `src/i18n/translations.js`

## 📝 Content Management

### Adding Blog Posts

Create a new `.md` or `.mdx` file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "Brief description"
date: 2024-01-01
tags: ["Enterprise Architecture", "Cloud"]
draft: false
---

Your content here...
```

### Dark Mode

- Automatically detects system preference
- Manual toggle in navigation
- Persists across sessions via localStorage
- Smooth transitions between modes

### Active Navigation

Navigation automatically highlights the current page with a beautiful glass frosted effect.

## 🚀 Deployment

### Cloudflare Pages (Recommended)

**Manual Deployment:**
```bash
npm run build
wrangler pages deploy dist
```

**Automatic Deployment:**
- Push to `main` branch
- GitHub Actions automatically builds and deploys
- Configured in `.github/workflows/deploy.yml`

### Build Configuration
- **Framework:** Astro
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node version:** 18+

## 🎨 Design Highlights

### Animated Mesh Backgrounds
Each page features unique animated gradient blobs with pastel colors:
- **Homepage:** Blue/Indigo/Purple
- **Perspectives:** Purple/Fuchsia/Pink
- **Portfolio:** Orange/Rose/Pink
- **Research:** Emerald/Teal/Cyan
- **Media:** Sky/Blue/Indigo
- **About:** Amber/Orange/Red

### Glass Morphism Navigation
Active navigation items feature:
- Backdrop blur for frosted glass effect
- Semi-transparent backgrounds
- Subtle border glow
- Smooth transitions

### Comprehensive Footer
- 5-column layout with site navigation
- Sustainability & values section
- Social media links
- Carbon-neutral hosting badge
- Tech stack transparency

## 📁 Project Structure

```
/
├── public/                    # Static assets
├── src/
│   ├── components/            # React components
│   │   ├── DarkModeToggle.jsx      # Theme switcher
│   │   ├── LanguageSwitcher.jsx    # i18n selector
│   │   ├── MeshBackground.jsx      # Animated backgrounds
│   │   ├── Nav.jsx                 # Navigation with active states
│   │   ├── Footer.jsx              # Comprehensive footer
│   │   └── ...
│   ├── config/                # Configuration
│   │   └── site.js                 # Site config & coming soon toggle
│   ├── content/               # Content collections
│   │   └── blog/                   # Blog posts (MDX)
│   ├── i18n/                  # Internationalization
│   │   └── translations.js         # Translation strings
│   ├── layouts/               # Page layouts
│   │   └── BaseLayout.astro        # Base layout with i18n
│   ├── pages/                 # Routes
│   │   ├── index.astro             # Homepage
│   │   ├── perspectives.astro      # Blog listing
│   │   ├── portfolio.astro         # Projects
│   │   ├── research.astro          # Publications
│   │   ├── media.astro             # Media library
│   │   ├── speaking.astro          # Talks & events
│   │   ├── about.astro             # About page
│   │   ├── soon.astro              # Coming soon page
│   │   └── blog/                   # Blog post routes
│   ├── styles/                # Global styles
│   │   └── global.css              # Tailwind + animations
│   └── middleware.js          # Coming soon redirect
├── astro.config.mjs           # Astro + i18n config
├── tailwind.config.cjs        # Tailwind configuration
└── package.json
```

## 🤝 Contributing

This is a personal portfolio project. However, if you find bugs or have suggestions, feel free to open an issue.

## 📄 License

Copyright © 2025 Mehdi Bamou. All rights reserved.

## 🙏 Acknowledgments

Built with:
- [Astro](https://astro.build) - The web framework for content-driven websites
- [React](https://react.dev) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com) - A utility-first CSS framework
- [Cloudflare Pages](https://pages.cloudflare.com) - Deploy your sites to Cloudflare's edge network

---

<div align="center">

**[View Live Site](https://mehdibamou.com)** • **[Report Bug](https://github.com/paratout/mbrand/issues)** • **[Request Feature](https://github.com/paratout/mbrand/issues)**

Made with ❤️ by [Mehdi Bamou](https://github.com/paratout)

</div>
