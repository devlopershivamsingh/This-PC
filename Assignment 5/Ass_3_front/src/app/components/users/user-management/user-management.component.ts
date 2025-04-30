import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  imports: [CommonModule, RouterModule],
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  errorMessage: string = '';


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    console.log("🔍 Fetching users...");
    this.userService.getAllUsers().subscribe({
      next: (data: any[]) => {
        console.log("✅ Users received:", data);
        this.users = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  viewUserProfile(userId: string) {
    this.userService.getUserProfile(userId).subscribe({
      next: (data: any) => {
        this.selectedUser = data;
        alert(`User Profile: ${JSON.stringify(data, null, 2)}`);
      },
      error: () => alert('Failed to load user profile.')
    });
  }

  updateProfile(updatedData: any) {
    this.userService.updateUserProfile(updatedData).subscribe({
      next: () => alert('Profile updated successfully!'),
      error: () => alert('Failed to update profile.')
    });
  }

  deleteUserProfile(userId: string) {
    console.log("🗑️ Deleting user with ID:", userId);
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => this.loadUsers(),
        error: () => alert('Failed to delete user.')
      });
    }
  }

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
    this.router.navigate(['/login']);
  }

}