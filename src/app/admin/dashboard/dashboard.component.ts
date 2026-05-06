import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  template: `
    <div style="padding:2rem; max-width:800px; margin:0 auto">
      <header style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem">
        <h1 style="font-size:1.5rem; margin:0">Admin Dashboard</h1>
        <div style="display:flex; gap:1rem; align-items:center">
          <a routerLink="/admin/publications/new" style="color:var(--accent-primary); font-weight:500">+ New Publication</a>
          <button (click)="auth.signOut()" style="font-size:0.85rem; cursor:pointer; background:none; border:1px solid var(--glass-border); padding:6px 14px; border-radius:8px">Sign out</button>
        </div>
      </header>
      <p style="color:var(--text-secondary)">Phase 3 — publications list coming soon.</p>
    </div>
  `,
})
export class DashboardComponent {
  protected auth = inject(AuthService);
}
