import { Component, input } from '@angular/core';

@Component({
  selector: 'app-editor',
  template: `
    <div style="padding:2rem; text-align:center; color:var(--text-secondary)">
      <h1 style="margin-bottom:1rem">{{ slug() ? 'Edit: ' + slug() : 'New Publication' }}</h1>
      <p style="font-size:0.85rem">Phase 3 — TipTap editor coming soon.</p>
    </div>
  `,
})
export class EditorComponent {
  /** Bound from route :slug — undefined when creating new */
  readonly slug = input<string | undefined>(undefined);
}
