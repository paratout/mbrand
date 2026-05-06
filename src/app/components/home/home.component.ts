import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PublicationService, Publication } from '../../core/services/publication.service';
import { estimateReadTime } from '../../core/utils/format.utils';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private pubService = inject(PublicationService);

  readonly publications = signal<Publication[]>([]);
  readonly isLoading    = signal(true);

  readonly estimateReadTime = estimateReadTime;

  readTime(pub: Publication): number {
    if (!pub.content) return 1;
    return estimateReadTime(JSON.stringify(pub.content));
  }

  ngOnInit(): void {
    this.pubService.getPublished().subscribe({
      next:  (pubs) => { this.publications.set(pubs); this.isLoading.set(false); },
      error: ()     => this.isLoading.set(false),
    });
  }
}
