import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
// import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['student', Validators.required]
    });
  }

  register() {
    //console.log("Register function called"); 
  
    if (this.signupForm.valid) {
      //console.log("Signup form is valid, sending request...");
      
      this.authService.signup(this.signupForm.value).subscribe(response => {
        console.log("Signup success:", response);
        alert(response.message);
      }, error => {
        console.error("Signup failed:", error);
        alert(error.error.message);
      });
    } else {
      console.warn("Form is invalid");
      alert("Please fill all fields correctly.");
    }
  }
  
}
