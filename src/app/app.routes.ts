import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  // Public routes
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'publications/:slug',
    loadComponent: () =>
      import('./public/publication/publication.component').then(
        (m) => m.PublicationComponent
      ),
  },
  // Auth
  {
    path: 'login',
    loadComponent: () =>
      import('./public/login/login.component').then((m) => m.LoginComponent),
  },
  // Admin — uses AdminLayoutComponent as parent shell (provides nav + router-outlet)
  {
    path: 'writer',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./admin/layout/admin-layout.component').then(
        (m) => m.AdminLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./admin/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'publications/new',
        loadComponent: () =>
          import('./admin/editor/editor.component').then(
            (m) => m.EditorComponent
          ),
      },
      {
        path: 'publications/:slug',
        loadComponent: () =>
          import('./admin/editor/editor.component').then(
            (m) => m.EditorComponent
          ),
      },
    ],
  },
  // Legal pages
  {
    path: 'privacy',
    loadComponent: () =>
      import('./public/legal/privacy.component').then((m) => m.PrivacyComponent),
  },
  {
    path: 'impressum',
    loadComponent: () =>
      import('./public/legal/impressum.component').then((m) => m.ImpressumComponent),
  },
  // Fallback
  {
    path: '**',
    loadComponent: () =>
      import('./public/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
