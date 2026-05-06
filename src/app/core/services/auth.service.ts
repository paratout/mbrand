import { Injectable, inject, signal, computed } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  user,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  readonly currentUser = toSignal(user(this.auth), { initialValue: null });

  readonly isLoggedIn = computed(() => this.currentUser() !== null);

  readonly isOwner = computed(() => {
    const u = this.currentUser();
    return u?.email === environment.adminEmail;
  });

  async signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ login_hint: environment.adminEmail });
    try {
      const result = await signInWithPopup(this.auth, provider);
      if (result.user.email !== environment.adminEmail) {
        // Not the owner — sign back out immediately
        await signOut(this.auth);
        throw new Error('Unauthorized: this site is private.');
      }
      await this.router.navigate(['/admin/dashboard']);
    } catch (err) {
      throw err;
    }
  }

  async signOut(): Promise<void> {
    await signOut(this.auth);
    await this.router.navigate(['/']);
  }
}
