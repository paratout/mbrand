import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  private auth = inject(Auth);
  private router = inject(Router);

  async login(event: Event) {
    event.preventDefault();
    if (!this.email || !this.password) return;

    this.loading = true;
    this.error = '';

    try {
      const credential = await signInWithEmailAndPassword(this.auth, this.email, this.password);

      if (credential.user.email !== environment.adminEmail) {
        this.error = 'Access denied. Unauthorized email address.';
        await this.auth.signOut();
      } else {
        this.router.navigate(['/admin']);
      }
    } catch (err: any) {
      this.error = err.message || 'Authentication failed. Check your credentials.';
    } finally {
      this.loading = false;
    }
  }
}
