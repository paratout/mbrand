import { Component, input } from '@angular/core';

@Component({
  selector: 'app-publication',
  template: `
    <div style="padding: 2rem; text-align: center; color: var(--text-secondary)">
      <p>Loading publication: <strong>{{ slug() }}</strong></p>
      <p style="margin-top:1rem; font-size:0.85rem">Phase 4 — coming soon.</p>
    </div>
  `,
})
export class PublicationComponent {
  /** Bound from route param :slug via withComponentInputBinding() */
  readonly slug = input<string>('');
}
