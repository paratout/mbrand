import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

interface GlossaryTerm {
  term: string;
  id: string;
  html: string;
}

interface RenderedTerm {
  term: string;
  id: string;
  body: SafeHtml;
}

interface LetterGroup {
  letter: string;
  terms: RenderedTerm[];
}

@Component({
  selector: 'app-glossary',
  imports: [SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './glossary.component.html',
  styleUrl: './glossary.component.scss',
})
export class GlossaryComponent implements OnInit {
  private sanitizer = inject(DomSanitizer);

  readonly terms     = signal<RenderedTerm[]>([]);
  readonly isLoading = signal(true);

  readonly groups = computed<LetterGroup[]>(() => {
    const map = new Map<string, RenderedTerm[]>();
    for (const t of this.terms()) {
      const letter = t.term[0].toUpperCase();
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter)!.push(t);
    }
    return [...map.entries()].map(([letter, terms]) => ({ letter, terms }));
  });

  constructor() {
    inject(Title).setTitle('Glossary - Mehdi Bamou');
    inject(Meta).updateTag({
      name: 'description',
      content: 'Enterprise architecture vocabulary in plain language: capabilities, portfolios, governance, and the terms architects use daily.',
    });
  }

  ngOnInit(): void {
    fetch('/content/glossary.json')
      .then((r) => (r.ok ? r.json() : []))
      .then((terms: GlossaryTerm[]) => {
        this.terms.set(
          terms.map((t) => ({ term: t.term, id: t.id, body: this.sanitizer.bypassSecurityTrustHtml(t.html) }))
        );
        this.isLoading.set(false);
      })
      .catch(() => this.isLoading.set(false));
  }
}
