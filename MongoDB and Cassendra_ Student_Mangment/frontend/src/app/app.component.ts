import { Component } from '@angular/core';
import axios from 'axios';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name: string = '';
  email: string = '';
  prn: string = '';
  phone: string = '';
  role: string = 'student';
  message: string = '';
  users: any[] = [];
  editMode: boolean = false;
  editUserId: string = '';
  formErrors: {[key: string]: boolean} = {
    name: false,
    email: false,
    prn: false,
    phone: false
  };

  ngOnInit() {
    this.getUsers();
  }

  async submitForm() {
    this.formErrors = {
      name: false,
      email: false, 
      prn: false,
      phone: false
    };

    let hasErrors = false;
    if (!this.name) {
      this.formErrors['name'] = true;
      hasErrors = true;
    }
    if (!this.email) {
      this.formErrors['email'] = true;
      hasErrors = true;
    }
    if (!this.prn) {
      this.formErrors['prn'] = true;
      hasErrors = true;
    }
    if (!this.phone) {
      this.formErrors['phone'] = true;
      hasErrors = true;
    }

    if (hasErrors) {
      this.message = 'Please fill in all required fields';
      return;
    }

    try {
      if (this.editMode) {
        await this.updateUser(this.editUserId, {
          name: this.name,
          email: this.email,
          prn: this.prn,
          phone: this.phone,
          role: this.role
        });
        this.editMode = false;
        this.editUserId = '';
      } else {
        await axios.post('http://localhost:5000/api/users', {
          name: this.name,
          email: this.email,
          prn: this.prn,
          phone: this.phone,
          role: this.role
        });
        this.message = 'User added successfully!';
      }
      this.resetForm();
      this.getUsers();
    } catch (error: any) {
      this.message = error.response?.data?.message || 'Error adding user!';
      console.error('Error submitting form:', error);
    }
  }

  async getUsers() {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      this.users = response.data;
    } catch (error) {
      this.message = 'Error fetching users!';
    }
  }

  async updateUser(id: string, userData: any) {
    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, userData);
      console.log(userData)
      this.message = 'User updated successfully!';
      this.getUsers();
    } catch (error: any) {
      this.message = error.response?.data?.message || 'Error updating user!';
      console.error('Error updating user:', error);
    }
  }

  async deleteUser(id: string) {
    try {
      console.log(id)
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      
      this.message = 'User deleted successfully!';
      this.getUsers();
    } catch (error: any) {
      this.message = error.response?.data?.message || 'Error deleting user!';
      console.error('Error deleting user:', error);
    }
  }

  loadUserForEdit(user: any) {
    this.editMode = true;
    this.editUserId = user._id;
    this.name = user.name;
    this.email = user.email;
    this.prn = user.prn;
    this.phone = user.phone;
    this.role = user.role;
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.prn = '';
    this.phone = '';
    this.role = 'student';
    this.formErrors = {
      name: false,
      email: false,
      prn: false,
      phone: false
    };
  }
}
