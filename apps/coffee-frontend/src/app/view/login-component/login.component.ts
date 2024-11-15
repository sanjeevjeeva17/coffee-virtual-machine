import { Component, signal } from '@angular/core';
import { Validators, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinner
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AdminService]
})
export class LoginComponent {
  loginForm;
  isInvalidLogin = signal(false);
  isLoading = signal(false);

  constructor(private fb: NonNullableFormBuilder, private adminService: AdminService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.getRawValue();
      this.isLoading.set(true);

      this.adminService.login(username, password).subscribe({
        next: () => {
          this.isInvalidLogin.set(false);
          this.isLoading.set(false);
          this.router.navigate(['/admin-panel']);
        },
        error: () => {
          this.isInvalidLogin.set(true);
          this.isLoading.set(false);
        }
      });
    }
  }
}
