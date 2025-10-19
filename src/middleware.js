import { siteConfig } from './config/site.js';

export async function onRequest({ url, redirect, cookies, request }, next) {
  // Allow access to the soon page itself
  if (url.pathname === '/soon') {
    return next();
  }

  // Allow access to /rabat (admin panel) - authentication happens in the component
  if (url.pathname === '/rabat' || url.pathname.startsWith('/rabat/')) {
    return next();
  }

  // Check if user is authenticated via our custom auth cookie
  const authCookie = cookies.get('sb-auth-token');
  const isAuthenticated = !!authCookie?.value;

  // If coming soon mode is enabled and user is not authenticated, redirect to /soon
  if (siteConfig.comingSoonMode && !isAuthenticated) {
    return redirect('/soon', 302);
  }

  // Otherwise, continue to the requested page
  return next();
}
