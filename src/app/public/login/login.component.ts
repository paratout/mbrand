import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  protected auth   = inject(AuthService);
  protected router = inject(Router);
  protected error   = signal<string | null>(null);
  protected loading = signal(true);

  async ngOnInit(): Promise<void> {
    // Wait for Firebase to restore auth state (handles both persisted sessions
    // and the return leg of a redirect flow).
    await this.auth.authStateReady();

    if (this.auth.isOwner()) {
      // Already authenticated — skip the login screen entirely.
      await this.router.navigate(['/writer/dashboard'], { replaceUrl: true });
      return;
    }

    this.loading.set(false);
  }

  async signIn(): Promise<void> {
    this.error.set(null);
    this.loading.set(true);
    try {
      await this.auth.signInWithGoogle(); // Redirects away — nothing runs after this
    } catch (err: unknown) {
      this.error.set(err instanceof Error ? err.message : 'Sign-in failed.');
      this.loading.set(false);
    }
  }
}
