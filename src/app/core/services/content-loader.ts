import { InjectionToken, inject, PendingTasks } from '@angular/core';

/**
 * Loads a JSON file from `public/content`.
 *
 * In the browser this is a plain fetch. While prerendering there is no HTTP
 * server to fetch from, so the server build swaps in an implementation that
 * reads the same file off disk. Everything that needs content goes through
 * here so neither environment has to special-case it.
 */
export type ContentLoader = <T>(path: string) => Promise<T | null>;

export const CONTENT_LOADER = new InjectionToken<ContentLoader>('CONTENT_LOADER');

/** Browser implementation: fetch from the origin the app was served from. */
export function browserContentLoader(): ContentLoader {
  const pending = inject(PendingTasks);
  return async <T>(path: string): Promise<T | null> => {
    // Registering the work keeps zoneless change detection and any future
    // hydration aware that the app is not settled yet.
    const done = pending.add();
    try {
      const res = await fetch(`/content/${path}`);
      return res.ok ? ((await res.json()) as T) : null;
    } catch {
      return null;
    } finally {
      done();
    }
  };
}
