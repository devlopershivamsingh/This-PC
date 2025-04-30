import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(response => {
        localStorage.setItem('name', response.name);  
        localStorage.setItem('email', response.email); 
        localStorage.setItem('token', response.token); 
        localStorage.setItem('role', response.role);  

        // Redirect based on role
        if (response.role === 'teacher') {
          this.router.navigate(['/dashboard']);
        } else if (response.role === 'student') {
          this.router.navigate(['/test']);
        }
      }, error => {
        alert(error.error.message);
      });
    } else {
      alert("Please enter valid email and password.");
    }
  }
}
