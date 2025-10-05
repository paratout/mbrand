import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(), 
    tailwind({ applyBaseStyles: false }), 
    mdx()
  ],
  output: 'server',
  adapter: cloudflare(),
  site: 'https://mehdibamou.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'ar', 'de'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
