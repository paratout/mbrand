import { Injectable, inject } from '@angular/core';
import { from, Observable } from 'rxjs';
import { CONTENT_LOADER } from './content-loader';

/**
 * Publications are static JSON generated at build time from
 * content/publications/*.md by scripts/build-content.mjs.
 */
export interface Publication {
  slug: string;
  title: string;
  summary: string;
  coverImage: string | null;
  publishedAt: string | null; // ISO string, drives ordering
  updatedAt: string | null;   // ISO string, shown to readers
  readMinutes: number;
}

export interface PublicationDetail extends Publication {
  html: string;
}

@Injectable({ providedIn: 'root' })
export class PublicationService {
  private load = inject(CONTENT_LOADER);

  /** All published publications, newest first. */
  getPublished(): Observable<Publication[]> {
    return from(this.load<Publication[]>('publications.json').then((p) => p ?? []));
  }

  /** One publication with rendered HTML body, or null when missing. */
  getBySlug(slug: string): Observable<PublicationDetail | null> {
    const safe = encodeURIComponent(slug);
    return from(this.load<PublicationDetail>(`publications/${safe}.json`));
  }
}
