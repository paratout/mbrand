# Coming Soon Mode

## Overview

The website includes a "Coming Soon" mode that displays a beautiful animated landing page instead of the full website. This is useful when you're still working on content and want to show a professional placeholder.

## How to Enable/Disable

### Enable Coming Soon Mode

Open `src/config/site.js` and set:

```javascript
comingSoonMode: true
```

All visitors will be redirected to the coming soon page.

### Disable Coming Soon Mode (Show Full Website)

Open `src/config/site.js` and set:

```javascript
comingSoonMode: false
```

The full website will be accessible to all visitors.

## Features

### Coming Soon Page (`/soon`)
- ✨ Beautiful animated gradient orbs
- 🎨 Glassmorphism design
- 📱 Fully responsive
- 🌙 Dark theme
- 🔗 Social media links
- 🎭 No navigation or footer
- ⚡ Smooth animations

### Middleware
- Automatically redirects all traffic to `/soon` when enabled
- Allows direct access to `/soon` page for testing
- Uses 302 redirect (temporary)

## Configuration

Edit `src/config/site.js` to customize:

```javascript
export const siteConfig = {
  comingSoonMode: true,  // Toggle here
  
  // Update these as needed
  title: 'Mehdi Bamou',
  description: 'Enterprise Architect & Technology Leader',
  
  social: {
    linkedin: 'https://linkedin.com/in/mehdibamou',
    github: 'https://github.com/mehdibamou',
    twitter: 'https://twitter.com/mehdibamou',
    medium: 'https://medium.com/@mehdibamou'
  }
};
```

## Testing

### Test Coming Soon Page
Visit: `http://localhost:4321/soon`

### Test with Mode Enabled
1. Set `comingSoonMode: true`
2. Visit any URL
3. Should redirect to `/soon`

### Test with Mode Disabled
1. Set `comingSoonMode: false`
2. Visit any URL
3. Should show normal website

## Deployment

When deploying:
1. Set `comingSoonMode: true` for work-in-progress
2. Set `comingSoonMode: false` when ready to launch
3. Commit and push changes
4. Deploy will automatically use the correct mode

## Files

- `src/config/site.js` - Configuration file (toggle here)
- `src/pages/soon.astro` - Coming soon page
- `src/middleware.js` - Redirect middleware
