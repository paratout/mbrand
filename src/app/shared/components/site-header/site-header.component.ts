import { Component, OnInit, signal, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

type TextSize = 's' | 'm' | 'l';
const SIZES: TextSize[] = ['s', 'm', 'l'];
const STORAGE_KEY = 'mb-text-size';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.scss',
})
export class SiteHeaderComponent implements OnInit {
  private document = inject(DOCUMENT);

  readonly textSize = signal<TextSize>('m');

  ngOnInit(): void {
    let saved: TextSize | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY) as TextSize | null;
    } catch { /* storage unavailable */ }
    if (saved && SIZES.includes(saved)) this.apply(saved);
  }

  smaller(): void {
    const i = SIZES.indexOf(this.textSize());
    if (i > 0) this.apply(SIZES[i - 1]);
  }

  larger(): void {
    const i = SIZES.indexOf(this.textSize());
    if (i < SIZES.length - 1) this.apply(SIZES[i + 1]);
  }

  private apply(size: TextSize): void {
    this.textSize.set(size);
    const root = this.document.documentElement;
    root.classList.remove('txt-s', 'txt-l');
    if (size !== 'm') root.classList.add(`txt-${size}`);
    try {
      localStorage.setItem(STORAGE_KEY, size);
    } catch { /* storage unavailable */ }
  }
}
