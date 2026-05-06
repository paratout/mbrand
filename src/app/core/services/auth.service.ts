import { Injectable, inject, signal, computed } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  user,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth   = inject(Auth);
  private router = inject(Router);

  readonly currentUser = toSignal(user(this.auth), { initialValue: null });
  readonly isLoggedIn  = computed(() => this.currentUser() !== null);
  readonly isOwner     = computed(() => this.currentUser()?.email === environment.adminEmail);

  /**
   * Starts the Google redirect auth flow.
   * The page navigates away — handleRedirectResult() must be called on return.
   */
  async signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ login_hint: environment.adminEmail });
    await signInWithRedirect(this.auth, provider);
  }

  /**
   * Must be called on the login page's ngOnInit.
   * Picks up the credential after Google redirects the user back.
   */
  async handleRedirectResult(): Promise<void> {
    try {
      const result = await getRedirectResult(this.auth);
      if (!result) return; // No redirect in progress — normal page load
      if (result.user.email !== environment.adminEmail) {
        await signOut(this.auth);
        throw new Error('Unauthorized: this site is private.');
      }
      await this.router.navigate(['/writer/dashboard']);
    } catch (err) {
      throw err;
    }
  }

  async signOut(): Promise<void> {
    await signOut(this.auth);
    await this.router.navigate(['/']);
  }
}
