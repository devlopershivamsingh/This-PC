import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-test.component.html',
  styleUrl: './student-test.component.css'
})
export class StudentTestComponent implements OnInit {
  questions: any[] = [];
  selectedAnswers: { [key: number]: string } = {};
  testStarted: boolean = false;
  viewingScore: boolean = false;
  startTime: number = 0;
  timer: any;
  timeLeft: number = 600; // 10 minutes
  minutes: number = 10;
  seconds: number = 0;
  scoreData: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  startTest() {
    this.http.get<any[]>('http://localhost:5000/api/questions').subscribe(data => {
      this.questions = data;
      this.testStarted = true;
      this.startTime = Date.now();
      this.startTimer();
    });
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.minutes = Math.floor(this.timeLeft / 60);
        this.seconds = this.timeLeft % 60;
      } else {
        clearInterval(this.timer);
        this.submitTest();
      }
    }, 1000);
  }

  submitTest() {
    clearInterval(this.timer);
    const timeTaken = Math.floor((Date.now() - this.startTime) / 1000);
    const submissionData = {
      studentName: localStorage.getItem('email'),
      answers: this.selectedAnswers,
      timeTaken: timeTaken,
      score: 0 // To be calculated later
    };
    
    this.http.post('http://localhost:5000/api/questions/submit-test', submissionData).subscribe(response => {
      console.log("Test submitted", response);
      alert("Test submitted successfully!");
      this.testStarted = false;
    });
  }

  viewscore() {
    const studentEmail = localStorage.getItem('email');

    if (!studentEmail) {
      alert("No student email found. Please log in again.");
      return;
    }

    this.http.get<any[]>(`http://localhost:5000/api/score/getscore/${studentEmail}`).subscribe(
      (data) => {
        console.log("Test Submissions:", data);
        this.scoreData = data;
        this.viewingScore = true;
        this.testStarted = false;
      },
      (error) => {
        console.error("Error fetching scores:", error);
        alert("Failed to load scores. Please try again.");
      }
    );
  }

  goBack() {
    this.viewingScore = false;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }

  getOptionText(question: any, option: string): string {
    return question[`option_${option.toLowerCase()}`] || '';
  }
}
