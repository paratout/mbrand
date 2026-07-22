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

@Component({
  selector: 'app-library',
  imports: [RouterLink, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
})
export class LibraryComponent implements OnInit {
  readonly items     = signal<LibraryItem[]>([]);
  readonly isLoading = signal(true);

  readonly tools     = computed(() => this.items().filter((i) => i.category === 'tool'));
  readonly resources = computed(() => this.items().filter((i) => i.category === 'article-resource'));

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

  formatSize(bytes: number | null): string {
    if (!bytes) return '';
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  downloadName(item: LibraryItem): string {
    return item.file?.split('/').pop() ?? '';
  }
}
