import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { inject, PendingTasks } from '@angular/core';
import type { ContentLoader } from './content-loader';

/**
 * Prerender-time implementation. This file is only ever pulled into the server
 * bundle, so the node imports never reach the browser.
 *
 * Content JSON is generated into `public/content` by scripts/build-content.mjs
 * before the Angular build runs, and the build copies `public` into the output.
 * Reading from the source folder keeps this independent of where the build
 * happens to write its assets.
 */
export function serverContentLoader(): ContentLoader {
  const root = join(process.cwd(), 'public', 'content');
  const pending = inject(PendingTasks);
  return async <T>(path: string): Promise<T | null> => {
    // Without registering the read as pending work, prerendering serializes
    // the page before the content arrives and writes out an empty shell.
    const done = pending.add();
    try {
      return JSON.parse(await readFile(join(root, path), 'utf-8')) as T;
    } catch {
      return null;
    } finally {
      done();
    }
  };
}
