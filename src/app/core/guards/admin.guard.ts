import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = async () => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  // Wait for Firebase to fully restore auth state from redirect / persisted session.
  // Without this, isOwner() is false during the brief window before Firebase
  // processes the redirect credential, causing an infinite redirect loop.
  await auth.authStateReady();

  if (auth.isOwner()) return true;

  return router.createUrlTree(['/login']);
};
