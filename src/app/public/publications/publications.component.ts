import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PublicationService, Publication } from '../../core/services/publication.service';
import { estimateReadTime } from '../../core/utils/format.utils';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-publications',
  imports: [RouterLink, DatePipe, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.scss',
})
export class PublicationsComponent implements OnInit {
  private pubService = inject(PublicationService);

  readonly allPublications = signal<Publication[]>([]);
  readonly currentPage     = signal(1);
  readonly isLoading       = signal(true);

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.allPublications().length / PAGE_SIZE))
  );

  readonly publications = computed(() => {
    const start = (this.currentPage() - 1) * PAGE_SIZE;
    return this.allPublications().slice(start, start + PAGE_SIZE);
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
    if (this.hasPrev()) { this.currentPage.update((p) => p - 1); window.scrollTo(0, 0); }
  }

  nextPage(): void {
    if (this.hasNext()) { this.currentPage.update((p) => p + 1); window.scrollTo(0, 0); }
  }

  goToPage(n: number): void { this.currentPage.set(n); window.scrollTo(0, 0); }

  readTime(pub: Publication): number {
    if (!pub.content) return 1;
    return estimateReadTime(JSON.stringify(pub.content));
  }
}
