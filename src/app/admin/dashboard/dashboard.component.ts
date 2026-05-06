import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PublicationService, Publication } from '../../core/services/publication.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private pubService = inject(PublicationService);

  readonly publications = signal<Publication[]>([]);
  readonly isLoading = signal(true);
  readonly deletingSlug = signal<string | null>(null);

  ngOnInit(): void {
    this.pubService.getAll().subscribe({
      next: (pubs) => { this.publications.set(pubs); this.isLoading.set(false); },
      error: () => this.isLoading.set(false),
    });
  }

  confirmDelete(pub: Publication): void {
    const label = pub.title?.trim() || 'Untitled';
    if (!confirm(`Delete "${label}"? This cannot be undone.`)) return;
    this.deletingSlug.set(pub.slug);
    this.pubService.delete(pub.slug).subscribe(() => {
      this.publications.update((list) => list.filter((p) => p.slug !== pub.slug));
      this.deletingSlug.set(null);
    });
  }
}
