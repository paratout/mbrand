import { siteConfig } from './config/site.js';

export async function onRequest({ url, redirect, cookies }, next) {
  // Allow access to the soon page itself
  if (url.pathname === '/soon') {
    return next();
  }

  // Allow access to /rabat (admin panel) - authentication happens in the component
  if (url.pathname === '/rabat' || url.pathname.startsWith('/rabat/')) {
    return next();
  }

  // Check if user is authenticated via Supabase session cookie
  // Check for common Supabase cookie patterns
  const isAuthenticated = !!(
    cookies.get('sb-access-token')?.value ||
    cookies.get('sb-refresh-token')?.value ||
    cookies.has('supabase-auth-token')
  );

  // If coming soon mode is enabled and user is not authenticated, redirect to /soon
  if (siteConfig.comingSoonMode && !isAuthenticated) {
    return redirect('/soon', 302);
  }

  // Otherwise, continue to the requested page
  return next();
}
