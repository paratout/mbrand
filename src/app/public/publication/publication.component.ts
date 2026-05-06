import { Component, input, OnInit, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PublicationService, Publication } from '../../core/services/publication.service';
import { tiptapToHtml } from '../../core/utils/tiptap-html.utils';
import { estimateReadTime, formatBytes } from '../../core/utils/format.utils';

@Component({
  selector: 'app-publication',
  imports: [RouterLink, DatePipe],
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.scss',
})
export class PublicationComponent implements OnInit {
  /** Bound from route :slug via withComponentInputBinding() */
  readonly slug = input<string>('');

  private pubService = inject(PublicationService);
  private sanitizer  = inject(DomSanitizer);

  readonly pub       = signal<Publication | null>(null);
  readonly bodyHtml  = signal<SafeHtml>('');
  readonly readTime  = signal(0);
  readonly isLoading = signal(true);
  readonly notFound  = signal(false);

  readonly formatBytes = formatBytes;

  ngOnInit(): void {
    this.pubService.getBySlug(this.slug()).subscribe((p) => {
      if (!p || p.status !== 'published') {
        this.notFound.set(true);
      } else {
        this.pub.set(p);
        const html = tiptapToHtml(p.content);
        this.bodyHtml.set(this.sanitizer.bypassSecurityTrustHtml(html));
        this.readTime.set(estimateReadTime(p.content ? JSON.stringify(p.content) : ''));
      }
      this.isLoading.set(false);
    });
  }
}
