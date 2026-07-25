import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

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
  /** All published publications, newest first. */
  getPublished(): Observable<Publication[]> {
    return from(
      fetch('/content/publications.json').then((r) => {
        if (!r.ok) throw new Error(`publications.json ${r.status}`);
        return r.json() as Promise<Publication[]>;
      })
    );
  }

  /** One publication with rendered HTML body, or null when missing. */
  getBySlug(slug: string): Observable<PublicationDetail | null> {
    const safe = encodeURIComponent(slug);
    return from(
      fetch(`/content/publications/${safe}.json`).then((r) => {
        if (r.status === 404) return null;
        if (!r.ok) throw new Error(`publication ${slug} ${r.status}`);
        return r.json() as Promise<PublicationDetail>;
      })
    );
  }
}
