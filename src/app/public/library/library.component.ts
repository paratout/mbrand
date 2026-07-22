import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

export interface LibraryItem {
  slug: string;
  title: string;
  description: string;
  category: 'tool' | 'article-resource';
  file: string | null;
  filetype: string;
  sizeBytes: number | null;
  related: string | null;
  relatedTitle: string | null;
}

export type LibraryFilter = 'all' | 'tool' | 'article-resource';

const PAGE_SIZE = 8;

@Component({
  selector: 'app-library',
  imports: [RouterLink, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
})
export class LibraryComponent implements OnInit {
  readonly items     = signal<LibraryItem[]>([]);
  readonly isLoading = signal(true);
  readonly filter    = signal<LibraryFilter>('all');
  readonly query     = signal('');
  readonly page      = signal(1);

  readonly toolCount     = computed(() => this.items().filter((i) => i.category === 'tool').length);
  readonly resourceCount = computed(() => this.items().filter((i) => i.category === 'article-resource').length);

  readonly filtered = computed(() => {
    const f = this.filter();
    const q = this.query().trim().toLowerCase();
    return this.items().filter((i) => {
      if (f !== 'all' && i.category !== f) return false;
      if (!q) return true;
      return (i.title + ' ' + i.description + ' ' + (i.relatedTitle ?? '') + ' ' + i.filetype)
        .toLowerCase()
        .includes(q);
    });
  });

  readonly pageCount = computed(() => Math.max(1, Math.ceil(this.filtered().length / PAGE_SIZE)));

  readonly currentPage = computed(() => Math.min(this.page(), this.pageCount()));

  readonly paged = computed(() => {
    const start = (this.currentPage() - 1) * PAGE_SIZE;
    return this.filtered().slice(start, start + PAGE_SIZE);
  });

  readonly pages = computed(() => Array.from({ length: this.pageCount() }, (_, i) => i + 1));

  constructor() {
    inject(Title).setTitle('Library - Mehdi Bamou');
    inject(Meta).updateTag({
      name: 'description',
      content: 'Free tools, templates, and diagrams for enterprise architecture and governance work - ready to download and adapt.',
    });
  }

  ngOnInit(): void {
    fetch('/content/library.json')
      .then((r) => (r.ok ? r.json() : []))
      .then((items: LibraryItem[]) => { this.items.set(items); this.isLoading.set(false); })
      .catch(() => this.isLoading.set(false));
  }

  setFilter(f: LibraryFilter): void {
    this.filter.set(f);
    this.page.set(1);
  }

  onSearch(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
    this.page.set(1);
  }

  goTo(p: number): void {
    if (p < 1 || p > this.pageCount()) return;
    this.page.set(p);
    document.getElementById('library-grid')?.scrollIntoView({ behavior: 'auto', block: 'start' });
  }

  formatSize(bytes: number | null): string {
    if (!bytes) return '';
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  downloadName(item: LibraryItem): string {
    return item.file?.split('/').pop() ?? '';
  }

  categoryLabel(item: LibraryItem): string {
    return item.category === 'tool' ? 'Tool' : 'Diagram';
  }
}
