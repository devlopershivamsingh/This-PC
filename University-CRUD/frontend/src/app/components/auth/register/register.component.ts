import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})

export class RegisterComponent {
  registerForm!: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    console.log('Initializing RegisterComponent...');
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
    console.log('RegisterForm initialized');
  }

  onSubmit() {
    console.log('Submit button clicked');
    if (this.registerForm.valid) {
      console.log('Form is valid, proceeding with registration...');
      console.log('Form values:', this.registerForm.value);
      this.loading = true;
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          console.log('Attempting navigation to login page...');
          this.router.navigate(['/login']).then(success => {
            if (success) {
              console.log('Navigation to login successful');
            } else {
              console.error('Navigation to login failed');
            }
          });
        },
        error: (error) => {
          console.error('Registration error:', error);
          console.log('Setting error message...');
          this.errorMessage = error?.error?.message || 'Registration failed!';
          this.loading = false;
          console.log('Loading state set to false');
        },
        complete: () => {
          console.log('Registration process completed');
          this.loading = false;
          console.log('Loading state set to false');
        }
      });
    } else {
      console.log('Form validation failed');
      console.log('Form errors:', this.registerForm.errors);
    }
  }

  onClickLogin() {
    console.log("Login link clicked");
    console.log("Navigating to login page...");
    this.router.navigate(['/login']);
  }
}
