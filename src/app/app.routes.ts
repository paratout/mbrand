import { Routes } from '@angular/router';

export const routes: Routes = [
  // Public routes
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./public/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'publications',
    loadComponent: () =>
      import('./public/publications/publications.component').then(
        (m) => m.PublicationsComponent
      ),
  },
  {
    path: 'publications/:slug',
    loadComponent: () =>
      import('./public/publication/publication.component').then(
        (m) => m.PublicationComponent
      ),
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
