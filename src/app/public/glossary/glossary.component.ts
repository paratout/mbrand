import { Component, OnInit, signal, computed, inject, ElementRef, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

interface GlossaryTerm {
  term: string;
  id: string;
  category: string;
  html: string;
  text: string;
}

interface GlossaryFile {
  categories: string[];
  terms: GlossaryTerm[];
}

interface RenderedTerm {
  term: string;
  id: string;
  category: string;
  body: SafeHtml;
  haystack: string;
  /* term name split around the current query, so a match can be marked without innerHTML */
  pre: string;
  hit: string;
  post: string;
}

interface LetterGroup {
  letter: string;
  terms: RenderedTerm[];
}

interface CategoryChip {
  name: string;
  count: number;
}

@Component({
  selector: 'app-glossary',
  imports: [SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './glossary.component.html',
  styleUrl: './glossary.component.scss',
})
export class GlossaryComponent implements OnInit {
  private sanitizer = inject(DomSanitizer);
  private router = inject(Router);

  private readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly all        = signal<RenderedTerm[]>([]);
  readonly categories = signal<string[]>([]);
  readonly isLoading  = signal(true);
  readonly query      = signal('');
  readonly category   = signal<string>('all');

  readonly searching = computed(() => this.query().trim().length > 0);

  readonly chips = computed<CategoryChip[]>(() =>
    this.categories().map((name) => ({
      name,
      count: this.all().filter((t) => t.category === name).length,
    }))
  );

  /** Category filter applied, but not the text query - drives the letter nav. */
  private readonly inCategory = computed(() => {
    const c = this.category();
    return c === 'all' ? this.all() : this.all().filter((t) => t.category === c);
  });

  readonly filtered = computed<RenderedTerm[]>(() => {
    const q = this.query().trim().toLowerCase();
    const base = this.inCategory();
    if (!q) return base;
    return base
      .filter((t) => t.haystack.includes(q))
      .map((t) => {
        const i = t.term.toLowerCase().indexOf(q);
        return i < 0
          ? { ...t, pre: t.term, hit: '', post: '' }
          : { ...t, pre: t.term.slice(0, i), hit: t.term.slice(i, i + q.length), post: t.term.slice(i + q.length) };
      });
  });

  readonly groups = computed<LetterGroup[]>(() => {
    const map = new Map<string, RenderedTerm[]>();
    for (const t of this.filtered()) {
      const letter = t.term[0].toUpperCase();
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter)!.push(t);
    }
    return [...map.entries()].map(([letter, terms]) => ({ letter, terms }));
  });

  readonly resultCount = computed(() => this.filtered().length);
  readonly totalCount  = computed(() => this.all().length);

  constructor() {
    inject(Title).setTitle('Glossary - Mehdi Bamou');
    inject(Meta).updateTag({
      name: 'description',
      content:
        'A working dictionary of enterprise architecture: capabilities, portfolios, data, integration, packaged software, governance, delivery, and technology - defined in plain language, with opinions.',
    });
  }

  ngOnInit(): void {
    fetch('/content/glossary.json')
      .then((r) => (r.ok ? r.json() : { categories: [], terms: [] }))
      .then((data: GlossaryFile | GlossaryTerm[]) => {
        // tolerate the older array-shaped file
        const file: GlossaryFile = Array.isArray(data) ? { categories: [], terms: data } : data;
        this.categories.set(file.categories ?? []);
        this.all.set(
          (file.terms ?? []).map((t) => ({
            term: t.term,
            id: t.id,
            category: t.category ?? '',
            body: this.sanitizer.bypassSecurityTrustHtml(t.html),
            haystack: (t.term + ' ' + (t.text ?? '') + ' ' + (t.category ?? '')).toLowerCase(),
            pre: t.term,
            hit: '',
            post: '',
          }))
        );
        this.isLoading.set(false);
        this.scrollToFragment();
      })
      .catch(() => this.isLoading.set(false));
  }

  /**
   * Terms render only after the fetch resolves, so neither the browser nor the
   * router can honour a deep link on first load. Scroll once the list exists,
   * and retry briefly because rendering is zoneless.
   */
  private scrollToFragment(attempt = 0): void {
    const id = decodeURIComponent(location.hash.replace(/^#/, ''));
    if (!id) return;
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: 'start' });
        return;
      }
      if (attempt < 20) this.scrollToFragment(attempt + 1);
    });
  }

  /** Letter nav is a jump control rather than a link, so the scroll is explicit. */
  jumpToLetter(letter: string): void {
    const el = document.getElementById('letter-' + letter);
    if (!el) return;
    (el.closest('.letter-group') ?? el).scrollIntoView({ block: 'start' });
    history.replaceState(null, '', '/glossary#letter-' + letter);
  }

  onSearch(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  clearSearch(): void {
    this.query.set('');
    this.searchInput()?.nativeElement.focus();
  }

  setCategory(name: string): void {
    this.category.set(name);
  }

  /** Press "/" anywhere to jump into the search box. */
  onKeydown(event: KeyboardEvent): void {
    if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return;
    const el = event.target as HTMLElement | null;
    const tag = el?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || el?.isContentEditable) return;
    event.preventDefault();
    this.searchInput()?.nativeElement.focus();
  }

  /**
   * Handles every internal link on the page. Same-page fragments are scrolled
   * with scrollIntoView so the sticky header and toolbar are cleared - the
   * browser's own fragment scrolling ignores scroll-margin here. Links out to
   * an article are routed rather than reloading the app.
   */
  onBodyClick(event: MouseEvent): void {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    const anchor = (event.target as HTMLElement)?.closest?.('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (!href || !href.startsWith('/') || href.startsWith('//')) return;

    const [path, fragment] = href.split('#');
    const samePage = !path || path === '/glossary';

    if (samePage && fragment) {
      const el = document.getElementById(fragment);
      if (el) {
        event.preventDefault();
        el.scrollIntoView({ block: 'start' });
        history.replaceState(null, '', `/glossary#${fragment}`);
      }
      return;
    }

    event.preventDefault();
    this.router.navigateByUrl(fragment ? `${path}#${fragment}` : path);
  }
}
