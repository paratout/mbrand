import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PublicationService, Publication } from '../../core/services/publication.service';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

const LATEST_COUNT = 3;

@Component({
  selector: 'app-home',
  imports: [RouterLink, DatePipe, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private pubService = inject(PublicationService);

  readonly allPublications = signal<Publication[]>([]);
  readonly isLoading       = signal(true);

  readonly latest = computed(() => this.allPublications().slice(0, LATEST_COUNT));
  readonly hasMore = computed(() => this.allPublications().length > LATEST_COUNT);

  readonly focusAreas = [
    {
      index: '01',
      title: 'Organization',
      text: 'How companies structure themselves: operating models, business processes, and the people who make them work.',
    },
    {
      index: '02',
      title: 'Governance',
      text: 'The decision rights, standards, and guardrails that keep complex organizations and IT landscapes coherent.',
    },
    {
      index: '03',
      title: 'Technology',
      text: 'Application portfolios, enterprise architecture, and the pragmatic use of technology at scale.',
    },
  ];

  ngOnInit(): void {
    this.pubService.getPublished().subscribe({
      next:  (pubs) => { this.allPublications.set(pubs); this.isLoading.set(false); },
      error: ()     => this.isLoading.set(false),
    });
  }
}
