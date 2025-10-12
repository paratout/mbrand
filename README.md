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

A professional portfolio and thought leadership platform showcasing expertise in enterprise architecture, digital transformation, and technology leadership. Built with modern web technologies and focused on knowledge sharing and professional presence.

**Key Focus Areas:**
- 🏗️ Enterprise Architecture & TOGAF
- 🤖 AI/ML Integration in Enterprise Systems
- 🌱 Green Energy & ESG Technology Strategy
- ☁️ Cloud Architecture & Migration
- 🌍 Digital Transformation (Europe & MENA)
- 📚 Research & Publications

## 🚀 Tech Stack

- **[Astro](https://astro.build)** - Modern static site generator with server-side rendering
- **[React](https://react.dev)** - Interactive UI components
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Cloudflare Pages](https://pages.cloudflare.com)** - Edge deployment platform
- **[MDX](https://mdxjs.com)** - Markdown with JSX for rich content

## ✨ Features

### Core Features
- 🌓 **Dark Mode** - System preference detection with manual toggle, persistent across sessions
- 📱 **Fully Responsive** - Mobile-first design, optimized for all devices
- 🔍 **SEO Optimized** - Proper meta tags, semantic HTML, and Open Graph support
- ⚡ **Performance** - Static site generation with edge deployment on Cloudflare
- ♿ **Accessible** - WCAG compliant with proper ARIA labels
- 📄 **Project Detail Pages** - Individual pages for each project with company context and outcomes

### Design System
- 🎨 **Animated Mesh Backgrounds** - Beautiful gradient blob animations on all hero sections
- 💎 **Glass Morphism** - Frosted glass effects for active navigation states
- 🎭 **Unique Color Identity** - Each section has its own pastel color variant
- 🔄 **Smooth Transitions** - Professional animations throughout
- 📐 **Consistent Layout** - Unified design language across all pages

### Content Sections
- 📝 **Perspectives** - In-depth articles on AI, ESG, enterprise architecture, and digital transformation
- 💼 **Portfolio** - Strategic architecture projects with detailed case studies
- 🎤 **Speaking** - Conference talks and speaking opportunities
- 📚 **Publications** - Research papers, white papers, and practical resources
- 📸 **Media Library** - Professional photos, presentations, and videos
- 👤 **About** - Professional background, credentials, and career timeline

### Developer Features
- 🚧 **Coming Soon Mode** - Toggle to show/hide full site during development
- 🔧 **Centralized Config** - Easy site configuration in `src/config/site.js`
- 📦 **Component Library** - Reusable React components
- 🎯 **Active Navigation** - Automatic highlighting of current page

## Site Structure

```
/                          - Homepage
/perspectives              - Articles on AI, ESG, EA, and digital transformation
/perspectives/[article]    - Individual article pages
/portfolio                 - Strategic architecture projects
/projects/[project]        - Detailed project case studies
/speaking                  - Conference talks and opportunities
/publications              - Research papers, white papers, and resources
/media                     - Media library (photos, presentations, videos)
/about                     - Professional background and credentials
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

### Language

The site is built in English for maximum reach and accessibility.

## 📝 Content Management

### Adding Perspective Articles

Create a new `.astro` file in `src/pages/perspectives/`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import MeshBackground from '../../components/MeshBackground.jsx';

const article = {
  title: 'Your Article Title',
  date: 'October 10, 2024',
  readTime: '8 min read',
  author: 'Mehdi Bamou',
  category: 'Enterprise Architecture',
  tags: ['TOGAF', 'Digital Transformation'],
  image: 'https://images.unsplash.com/...'
};
---

<BaseLayout title={article.title} ...>
  <!-- Article content -->
</BaseLayout>
```

### Adding Projects

Create a new `.astro` file in `src/pages/projects/` with company details, technologies, and outcomes.

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
│   │   ├── MeshBackground.jsx      # Animated backgrounds
│   │   ├── Nav.jsx                 # Navigation with active states
│   │   ├── Footer.jsx              # Comprehensive footer
│   │   └── ...
│   ├── config/                # Configuration
│   │   └── site.js                 # Site config & coming soon toggle
│   ├── content/               # Content collections
│   │   └── blog/                   # Blog posts (MDX)
│   ├── layouts/               # Page layouts
│   │   └── BaseLayout.astro        # Base layout
│   ├── pages/                 # Routes
│   │   ├── index.astro             # Homepage
│   │   ├── perspectives/           # Article pages
│   │   │   └── [article].astro     # Individual articles
│   │   ├── perspectives.astro      # Articles listing
│   │   ├── portfolio.astro         # Projects listing
│   │   ├── projects/               # Project detail pages
│   │   │   └── [project].astro     # Individual projects
│   │   ├── publications.astro      # Research & resources
│   │   ├── media.astro             # Media library
│   │   ├── speaking.astro          # Talks & events
│   │   ├── about.astro             # About page
│   │   └── soon.astro              # Coming soon page
│   ├── styles/                # Global styles
│   │   └── global.css              # Tailwind + animations
│   └── middleware.js          # Coming soon redirect
├── astro.config.mjs           # Astro configuration
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
