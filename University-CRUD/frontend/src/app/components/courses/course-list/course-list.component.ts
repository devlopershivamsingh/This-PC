import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  imports: [CommonModule, FormsModule]
})
export class CourseListComponent implements OnInit {
  courses: any[] = [];
  filteredCourses: any[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;
  searchQuery: string = '';
  userRole: string = '';
  successMessage!: string;

  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('user_role') || '';
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (data: any[]) => {
        this.courses = data;
        this.filteredCourses = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching courses:', err);
        this.errorMessage = 'Failed to load courses. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  viewCourseDetails(course:any): void {
    console.log("", course);
    this.router.navigate(['/courses', course.course_id]);
  }

}
