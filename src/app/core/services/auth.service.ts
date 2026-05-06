import { Injectable, inject, computed } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  user,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly firebaseAuth = inject(Auth);
  private router        = inject(Router);

  readonly currentUser = toSignal(user(this.firebaseAuth), { initialValue: null });
  readonly isLoggedIn  = computed(() => this.currentUser() !== null);
  readonly isOwner     = computed(() => this.currentUser()?.email === environment.adminEmail);

  /**
   * Resolves once Firebase has fully restored auth state from redirect / cache.
   * The guard awaits this before trusting isOwner().
   */
  authStateReady(): Promise<void> {
    return this.firebaseAuth.authStateReady();
  }

  /**
   * Starts the Google redirect flow — page navigates away.
   * On return the Firebase SDK automatically processes the credential;
   * no getRedirectResult() call is needed.
   */
  async signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ login_hint: environment.adminEmail });
    await signInWithRedirect(this.firebaseAuth, provider);
  }

  async signOut(): Promise<void> {
    await signOut(this.firebaseAuth);
    await this.router.navigate(['/']);
  }
}
