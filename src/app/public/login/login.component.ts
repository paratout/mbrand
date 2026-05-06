import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  protected auth = inject(AuthService);
  protected router = inject(Router);
  protected error = signal<string | null>(null);
  protected loading = signal(false);

  async signIn(): Promise<void> {
    this.error.set(null);
    this.loading.set(true);
    try {
      await this.auth.signInWithGoogle();
    } catch (err: unknown) {
      this.error.set(err instanceof Error ? err.message : 'Sign-in failed.');
    } finally {
      this.loading.set(false);
    }
  }
}
