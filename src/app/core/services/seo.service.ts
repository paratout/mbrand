import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

const ORIGIN = 'https://mehdibamou.com';
const DEFAULT_IMAGE = `${ORIGIN}/images/og-image.jpg`;

export interface PageSeo {
  /** Route path with a leading slash, e.g. "/publications/decision-records". */
  path: string;
  title: string;
  description: string;
  /** Absolute or site-relative image URL. Falls back to the site card. */
  image?: string | null;
  type?: 'website' | 'article';
}

/**
 * The app is a static SPA: every route is served the same index.html, whose
 * canonical, og:url and og:title all point at the home page. Left alone, that
 * tells search engines each article is a duplicate of the home page, which is
 * why this runs on every page component.
 *
 * Angular's Meta service handles the meta tags; the canonical is a <link>, so
 * it is managed here directly.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private doc = inject(DOCUMENT);
  private titleSvc = inject(Title);
  private metaSvc = inject(Meta);

  apply(seo: PageSeo): void {
    const url = `${ORIGIN}${seo.path === '/' ? '' : seo.path}`;
    const image = this.absolute(seo.image) ?? DEFAULT_IMAGE;

    this.titleSvc.setTitle(seo.title);
    this.setCanonical(url);

    this.metaSvc.updateTag({ name: 'description', content: seo.description });
    this.metaSvc.updateTag({ property: 'og:title', content: seo.title });
    this.metaSvc.updateTag({ property: 'og:description', content: seo.description });
    this.metaSvc.updateTag({ property: 'og:url', content: url });
    this.metaSvc.updateTag({ property: 'og:type', content: seo.type ?? 'website' });
    this.metaSvc.updateTag({ property: 'og:image', content: image });
    this.metaSvc.updateTag({ name: 'twitter:title', content: seo.title });
    this.metaSvc.updateTag({ name: 'twitter:description', content: seo.description });
    this.metaSvc.updateTag({ name: 'twitter:image', content: image });
  }

  private setCanonical(url: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private absolute(src: string | null | undefined): string | null {
    if (!src) return null;
    return src.startsWith('http') ? src : `${ORIGIN}${src}`;
  }
}
