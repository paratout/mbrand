import {
  Component, input, OnInit, OnDestroy, signal, inject, HostListener,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, DOCUMENT } from '@angular/common';
import { DomSanitizer, SafeHtml, Title, Meta } from '@angular/platform-browser';
import { PublicationService, PublicationDetail } from '../../core/services/publication.service';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';
import { ShareBarComponent } from '../../shared/components/share-bar/share-bar.component';

@Component({
  selector: 'app-publication',
  imports: [RouterLink, DatePipe, SiteHeaderComponent, SiteFooterComponent, ShareBarComponent],
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.scss',
})
export class PublicationComponent implements OnInit, OnDestroy {
  /** Bound from route :slug via withComponentInputBinding() */
  readonly slug = input<string>('');

  private pubService = inject(PublicationService);
  private sanitizer  = inject(DomSanitizer);
  private titleSvc   = inject(Title);
  private metaSvc    = inject(Meta);
  private document   = inject(DOCUMENT);

  readonly pub       = signal<PublicationDetail | null>(null);
  readonly bodyHtml  = signal<SafeHtml>('');
  readonly isLoading = signal(true);
  readonly notFound  = signal(false);
  readonly progress  = signal(0);

  private jsonLdEl: HTMLScriptElement | null = null;

  ngOnInit(): void {
    this.pubService.getBySlug(this.slug()).subscribe({
      next: (p) => {
        if (!p) {
          this.notFound.set(true);
        } else {
          this.pub.set(p);
          // Content is generated at build time from our own Markdown - trusted.
          this.bodyHtml.set(this.sanitizer.bypassSecurityTrustHtml(p.html));
          this.setPageMeta(p);
        }
        this.isLoading.set(false);
      },
      error: () => { this.notFound.set(true); this.isLoading.set(false); },
    });
  }

  ngOnDestroy(): void {
    this.titleSvc.setTitle('Mehdi Bamou - Organization, Governance & Technology');
    this.jsonLdEl?.remove();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const doc = this.document.documentElement;
    const total = doc.scrollHeight - doc.clientHeight;
    this.progress.set(total > 0 ? Math.min(100, (doc.scrollTop / total) * 100) : 0);
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
      author: { '@type': 'Person', name: 'Mehdi Bamou', url: 'https://mehdibamou.com' },
      mainEntityOfPage: `https://mehdibamou.com/publications/${p.slug}`,
    };
    this.jsonLdEl = this.document.createElement('script');
    this.jsonLdEl.type = 'application/ld+json';
    this.jsonLdEl.text = JSON.stringify(jsonLd);
    this.document.head.appendChild(this.jsonLdEl);
  }
}
