import { siteConfig } from './config/site.js';

export function onRequest({ url, redirect }, next) {
  // Allow access to the soon page itself
  if (url.pathname === '/soon') {
    return next();
  }

  // If coming soon mode is enabled, redirect all traffic to /soon
  if (siteConfig.comingSoonMode) {
    return redirect('/soon', 302);
  }

  // Otherwise, continue to the requested page
  return next();
}
