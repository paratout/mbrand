import { Component, inject, OnInit, signal, computed, PLATFORM_ID } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { RouterLink } from '@angular/router';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { PublicationService, Publication } from '../../core/services/publication.service';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

const PAGE_SIZE = 10;

/** publishedAt is nullable; undated pieces sort to the end of the course. */
function stamp(p: Publication): number {
  return p.publishedAt ? new Date(p.publishedAt).getTime() : Number.MAX_SAFE_INTEGER;
}

@Component({
  selector: 'app-publications',
  imports: [RouterLink, DatePipe, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.scss',
})
export class PublicationsComponent implements OnInit {
  private pubService = inject(PublicationService);
  private isBrowser  = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    inject(SeoService).apply({
      path: '/publications',
      title: 'Publications - Mehdi Bamou',
      description:
        'Essays and practical notes on enterprise architecture, governance, and technology in large organizations.',
    });
  }

  readonly allPublications = signal<Publication[]>([]);
  readonly currentPage     = signal(1);
  readonly isLoading       = signal(true);

  /**
   * The JSON arrives newest-first, which is right for the feed. The page
   * lists oldest-first so the order on screen is stable and independent of
   * which piece happens to carry the most recent date.
   */
  readonly ordered = computed(() =>
    [...this.allPublications()].sort((a, b) => stamp(a) - stamp(b))
  );

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.allPublications().length / PAGE_SIZE))
  );

  readonly publications = computed(() => {
    const start = (this.currentPage() - 1) * PAGE_SIZE;
    return this.ordered().slice(start, start + PAGE_SIZE);
  });

  readonly hasPrev = computed(() => this.currentPage() > 1);
  readonly hasNext = computed(() => this.currentPage() < this.totalPages());

  readonly pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );

  ngOnInit(): void {
    this.pubService.getPublished().subscribe({
      next:  (pubs) => { this.allPublications.set(pubs); this.isLoading.set(false); },
      error: ()     => this.isLoading.set(false),
    });
  }

  prevPage(): void {
    if (this.hasPrev()) { this.currentPage.update((p) => p - 1); this.toTop(); }
  }

  nextPage(): void {
    if (this.hasNext()) { this.currentPage.update((p) => p + 1); this.toTop(); }
  }

  goToPage(n: number): void { this.currentPage.set(n); this.toTop(); }

  private toTop(): void { if (this.isBrowser) window.scrollTo(0, 0); }
}
