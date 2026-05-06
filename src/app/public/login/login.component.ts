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
  protected loading = signal(false);

  /** Pick up the credential after Google redirects back to this page */
  async ngOnInit(): Promise<void> {
    this.loading.set(true);
    try {
      await this.auth.handleRedirectResult();
    } catch (err: unknown) {
      this.error.set(err instanceof Error ? err.message : 'Sign-in failed.');
    } finally {
      this.loading.set(false);
    }
  }

  async signIn(): Promise<void> {
    this.error.set(null);
    this.loading.set(true);
    try {
      await this.auth.signInWithGoogle(); // Navigates away — no code runs after this
    } catch (err: unknown) {
      this.error.set(err instanceof Error ? err.message : 'Sign-in failed.');
      this.loading.set(false);
    }
  }
}
