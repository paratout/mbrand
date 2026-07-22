import { Component, input, signal, computed } from '@angular/core';

/**
 * Share actions for a publication.
 * LinkedIn gets the /share/<slug>.html stub (correct link preview),
 * copy and native share use the canonical URL.
 */
@Component({
  selector: 'app-share-bar',
  templateUrl: './share-bar.component.html',
  styleUrl: './share-bar.component.scss',
})
export class ShareBarComponent {
  readonly title = input.required<string>();
  readonly slug  = input.required<string>();

  readonly copied = signal(false);

  readonly canonicalUrl = computed(() => `https://mehdibamou.com/publications/${this.slug()}`);
  readonly shareUrl     = computed(() => `https://mehdibamou.com/share/${this.slug()}.html`);

  readonly linkedInUrl = computed(
    () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.shareUrl())}`
  );

  readonly emailUrl = computed(
    () =>
      `mailto:?subject=${encodeURIComponent(this.title())}&body=${encodeURIComponent(
        `${this.title()}\n\n${this.canonicalUrl()}`
      )}`
  );

  readonly canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  async copyLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.canonicalUrl());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      // Clipboard unavailable - leave silently
    }
  }

  async nativeShare(): Promise<void> {
    try {
      await navigator.share({ title: this.title(), url: this.canonicalUrl() });
    } catch {
      // User dismissed - fine
    }
  }
}
