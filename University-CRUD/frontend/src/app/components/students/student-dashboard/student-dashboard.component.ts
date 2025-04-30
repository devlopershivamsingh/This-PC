import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
  imports: [CommonModule, FormsModule]
})
export class StudentDashboardComponent implements OnInit {
  enrolledCourses: any[] = [];
  grades: any[] = [];
  showGrades: boolean = false;
  errorMessage: string = '';

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.loadEnrolledCourses();
  }


  loadEnrolledCourses(): void {
    this.studentService.viewEnrolledCourses().subscribe({
      next: (data: any[]) => {
        console.log("Enrolled Courses:", data);
        this.enrolledCourses = data;
      },
      error: (err: any) => {
        console.error('Error fetching enrolled courses:', err);
        this.errorMessage = 'Failed to load enrolled courses.';
      }
    });
  }

  // Fetch grades when button is clicked
  loadGrades(): void {
    this.showGrades = true;
    this.studentService.viewGrades().subscribe({
      next: (data: any[]) => {
        console.log("Grades Data:", data);
        this.grades = data;
        // Merge grades into enrolledCourses for display
        this.enrolledCourses.forEach(course => {
          const gradeEntry = this.grades.find(g => g.course_id === course.course_id);
          course.grade = gradeEntry ? gradeEntry.grade : 'N/A';
        });
      },
      error: (err: any) => {
        console.error('Error fetching grades:', err);
        this.errorMessage = 'Failed to load grades.';
      }
    });
  }
}
