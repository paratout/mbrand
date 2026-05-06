import { Injectable, inject, computed } from '@angular/core';
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
  private auth   = inject(Auth);
  private router = inject(Router);

  readonly currentUser = toSignal(user(this.auth), { initialValue: null });
  readonly isLoggedIn  = computed(() => this.currentUser() !== null);
  readonly isOwner     = computed(() => this.currentUser()?.email === environment.adminEmail);

  async signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    const result   = await signInWithPopup(this.auth, provider);
    if (result.user.email !== environment.adminEmail) {
      await signOut(this.auth);
      throw new Error('Unauthorized.');
    }
    await this.router.navigate(['/writer/dashboard']);
  }

  async signOut(): Promise<void> {
    await signOut(this.auth);
    await this.router.navigate(['/']);
  }
}
