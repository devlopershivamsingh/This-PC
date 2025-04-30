import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css'
})
export class TeacherDashboardComponent implements OnInit {
  showCreateForm = false;
  showQuestionBank = false;
  showTestSubmissions = false;
  questionForm: FormGroup;
  selectedFile: File | null = null;
  previewImage: string | null = null;
  questions: any[] = [];
  testSubmissions: any[] = [];


  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.questionForm = this.fb.group({
      question_text: ['', Validators.required],
      option_a: ['', Validators.required],
      option_b: ['', Validators.required],
      option_c: ['', Validators.required],
      option_d: ['', Validators.required],
      correct_option: ['A', Validators.required]
    });
  }

  ngOnInit() {
    this.loadQuestions();
  }

  toggleCreateQuestion() {
    this.showCreateForm = true;
    this.showQuestionBank = false; // Hide question bank when showing form
  }

  toggleViewQuestions() {
    this.showCreateForm = false;
    this.showQuestionBank = true; // Hide form when viewing questions
    this.loadQuestions();
  }

  loadQuestions() {
    this.http.get('http://localhost:5000/api/questions').subscribe((data: any) => {
      this.questions = data;
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Preview the image
      const reader = new FileReader();
      reader.onload = (e: any) => this.previewImage = e.target.result;
      reader.readAsDataURL(file);
    }
  }

  submitQuestion() {
    if (this.questionForm.valid) {
      const questionId = this.questionForm.value.id;
  
      if (questionId) {
        // Editing existing question
        const updatedData = {
          question_text: this.questionForm.value.question_text,
          option_a: this.questionForm.value.option_a,
          option_b: this.questionForm.value.option_b,
          option_c: this.questionForm.value.option_c,
          option_d: this.questionForm.value.option_d,
          correct_option: this.questionForm.value.correct_option
        };
  
        this.http.put(`http://localhost:5000/api/questions/${questionId}`, updatedData)
          .subscribe(() => {
            alert("Question updated successfully!");
            this.resetForm();
          }, error => {
            console.error("Error updating question:", error);
            alert("Failed to update question.");
          });
  
      } else {
        // Creating a new question (uses FormData for file upload)
        const formData = new FormData();
        Object.keys(this.questionForm.value).forEach(key => {
          formData.append(key, this.questionForm.value[key]);
        });
  
        const teacherId = localStorage.getItem('teacherId') || '1';
        formData.append("created_by", teacherId);
  
        if (this.selectedFile) {
          formData.append("image", this.selectedFile);
        }
  
        this.http.post('http://localhost:5000/api/questions/create', formData)
          .subscribe(() => {
            alert("Question added successfully!");
            this.resetForm();
          }, error => {
            console.error("Error adding question:", error);
            alert("Failed to add question.");
          });
      }
    }
  }
  
  

  deleteQuestion(id: number) {
    if (confirm("Are you sure you want to delete this question?")) {
      this.http.delete(`http://localhost:5000/api/questions/${id}`).subscribe(() => {
        alert("Question deleted successfully!");
        this.loadQuestions();
      });
    }
  }

  editQuestion(question: any) {
    this.showCreateForm = true;  // Show the form for editing
    this.showQuestionBank = false; // Hide question bank when editing
  
    // Populate the form with the selected question's details
    this.questionForm.patchValue({
      question_text: question.question_text,
      option_a: question.option_a,
      option_b: question.option_b,
      option_c: question.option_c,
      option_d: question.option_d,
      correct_option: question.correct_option
    });
  
    // If the question has an image, show it in preview
    this.previewImage = question.image_url ? `http://localhost:5000${question.image_url}` : null;
  
    // Store the question ID to update on form submission
    this.questionForm.setControl('id', this.fb.control(question.id));
  }
  
  resetForm() {
    this.questionForm.reset();
    this.previewImage = null;
    this.selectedFile = null;
    this.showCreateForm = false;
    this.loadQuestions();
  }
  monitorTests() {
    this.http.get<any[]>('http://localhost:5000/api/questions/test-submissions').subscribe(
      (data) => {
        this.testSubmissions = data;
        this.showTestSubmissions = true;
        this.showCreateForm = false;
        this.showQuestionBank = false;
      },
      (error) => {
        console.error("Error fetching test submissions:", error);
        alert("Failed to load test submissions.");
      }
    );
  }
  goBack() {
    this.showTestSubmissions = false;
    this.showQuestionBank = false;
    this.showCreateForm = false;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }
}
