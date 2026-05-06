import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div style="min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1.5rem; text-align:center; padding:2rem">
      <h1 style="font-size:5rem; margin:0; line-height:1">404</h1>
      <p style="color:var(--text-secondary); font-size:1.1rem">This page doesn't exist.</p>
      <a routerLink="/" style="color:var(--accent-primary); font-weight:500">← Back to home</a>
    </div>
  `,
})
export class NotFoundComponent {}
