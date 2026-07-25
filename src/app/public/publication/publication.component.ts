import {
  Component, input, effect, untracked, OnDestroy, signal, computed, inject, HostListener,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe, DOCUMENT } from '@angular/common';
import { DomSanitizer, SafeHtml, Title, Meta } from '@angular/platform-browser';
import { PublicationService, Publication, PublicationDetail } from '../../core/services/publication.service';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';
import { ShareBarComponent } from '../../shared/components/share-bar/share-bar.component';

interface LightboxImage {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-publication',
  imports: [RouterLink, DatePipe, SiteHeaderComponent, SiteFooterComponent, ShareBarComponent],
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.scss',
})
export class PublicationComponent implements OnDestroy {
  /** Bound from route :slug via withComponentInputBinding() */
  readonly slug = input<string>('');

  private pubService = inject(PublicationService);
  private sanitizer  = inject(DomSanitizer);
  private titleSvc   = inject(Title);
  private metaSvc    = inject(Meta);
  private document   = inject(DOCUMENT);
  private router     = inject(Router);

  readonly pub       = signal<PublicationDetail | null>(null);
  readonly bodyHtml  = signal<SafeHtml>('');
  readonly isLoading = signal(true);
  readonly notFound  = signal(false);
  readonly progress  = signal(0);
  readonly lightbox  = signal<LightboxImage | null>(null);
  readonly readNext  = signal<Publication | null>(null);

  readonly showBackToTop = computed(() => this.progress() > 15 && !this.lightbox());

  private jsonLdEl: HTMLScriptElement | null = null;

  constructor() {
    // The router reuses this component when navigating between articles
    // (read-next card), so reload whenever the :slug input changes.
    effect(() => {
      const slug = this.slug();
      untracked(() => this.load(slug));
    });
  }

  private load(slug: string): void {
    if (!slug) return;
    this.isLoading.set(true);
    this.notFound.set(false);
    this.readNext.set(null);
    this.progress.set(0);
    this.closeLightbox();
    this.jsonLdEl?.remove();
    window.scrollTo({ top: 0 });

    this.pubService.getBySlug(slug).subscribe({
      next: (p) => {
        if (!p) {
          this.notFound.set(true);
        } else {
          this.pub.set(p);
          // Content is generated at build time from our own Markdown - trusted.
          this.bodyHtml.set(this.sanitizer.bypassSecurityTrustHtml(p.html));
          this.setPageMeta(p);
          this.loadReadNext(p.slug);
          this.fixHeadingAnchors();
        }
        this.isLoading.set(false);
      },
      error: () => { this.notFound.set(true); this.isLoading.set(false); },
    });
  }

  ngOnDestroy(): void {
    this.titleSvc.setTitle('Mehdi Bamou - Organization, Governance & Technology');
    this.jsonLdEl?.remove();
    this.document.body.style.removeProperty('overflow');
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const doc = this.document.documentElement;
    const total = doc.scrollHeight - doc.clientHeight;
    this.progress.set(total > 0 ? Math.min(100, (doc.scrollTop / total) * 100) : 0);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.lightbox()) this.closeLightbox();
  }

  /**
   * Heading anchors are emitted as bare "#id" hrefs. Angular's <base href="/">
   * makes browsers resolve those against the site root, so they render as
   * "/#id" and land on the homepage. Rewrite them to the current path once the
   * body is in the DOM, so hovering, copying, and opening in a new tab all give
   * a URL that actually works.
   */
  private fixHeadingAnchors(attempt = 0): void {
    const win = this.document.defaultView;
    const run = () => {
      const anchors = this.document.querySelectorAll('.pub-body a.h-anchor');
      // Rendering is zoneless, so the body may not be painted yet - retry briefly.
      if (!anchors.length) {
        if (attempt < 20) this.fixHeadingAnchors(attempt + 1);
        return;
      }
      const path = this.document.location.pathname;
      anchors.forEach((el) => {
        const a = el as HTMLAnchorElement;
        const id = a.getAttribute('href')?.split('#')[1] ?? '';
        if (id) a.setAttribute('href', `${path}#${id}`);
      });
    };
    if (win?.requestAnimationFrame) win.requestAnimationFrame(run); else setTimeout(run);
  }

  /** Click delegation for the article body: images, heading anchors, internal links. */
  onBodyClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (target instanceof HTMLImageElement && target.closest('.pub-body')) {
      this.openLightbox({ src: target.src, alt: target.alt });
      return;
    }

    const link = target.closest('a') as HTMLAnchorElement | null;
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;

    // Heading anchor: scroll in place and update the fragment, no page reload.
    if (link.classList.contains('h-anchor')) {
      const id = link.getAttribute('href')?.split('#')[1] ?? '';
      const heading = id ? this.document.getElementById(id) : null;
      if (heading) {
        event.preventDefault();
        heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.document.defaultView?.history.replaceState(
          null, '', `${this.document.location.pathname}#${id}`,
        );
      }
      return;
    }

    // Internal links inside the prose route through Angular instead of reloading.
    const href = link.getAttribute('href') ?? '';
    if (href.startsWith('/') && !href.startsWith('//') && link.target !== '_blank') {
      event.preventDefault();
      this.router.navigateByUrl(href);
    }
  }

  openLightbox(img: LightboxImage): void {
    this.lightbox.set(img);
    this.document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightbox.set(null);
    this.document.body.style.removeProperty('overflow');
  }

  backToTop(): void {
    window.scrollTo({ top: 0 });
  }

  private loadReadNext(currentSlug: string): void {
    this.pubService.getPublished().subscribe({
      next: (pubs) => {
        const i = pubs.findIndex((p) => p.slug === currentSlug);
        const next = pubs[i + 1] ?? (i > 0 ? pubs[i - 1] : null);
        this.readNext.set(next ?? null);
      },
      error: () => this.readNext.set(null),
    });
  }

  private setPageMeta(p: PublicationDetail): void {
    this.titleSvc.setTitle(`${p.title} - Mehdi Bamou`);
    this.metaSvc.updateTag({ name: 'description', content: p.summary });

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: p.title,
      description: p.summary,
      image: p.coverImage ? `https://mehdibamou.com${p.coverImage}` : undefined,
      datePublished: p.publishedAt,
      dateModified: p.updatedAt ?? p.publishedAt,
      author: { '@type': 'Person', name: 'Mehdi Bamou', url: 'https://mehdibamou.com' },
      mainEntityOfPage: `https://mehdibamou.com/publications/${p.slug}`,
    };
    this.jsonLdEl = this.document.createElement('script');
    this.jsonLdEl.type = 'application/ld+json';
    this.jsonLdEl.text = JSON.stringify(jsonLd);
    this.document.head.appendChild(this.jsonLdEl);
  }
}
