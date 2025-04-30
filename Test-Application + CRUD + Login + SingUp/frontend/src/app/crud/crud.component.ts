import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { ApiService } from '../api.service';

@Component({

  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [ApiService],

})
export class CrudComponent {
  tables = ['departments', 'employees'];
  selectedTable = 'departments';
  records: any[] = [];
  recordForm: FormGroup;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.recordForm = this.fb.group({
      id: [''],
      name: [''],
      position: [''],
      salary: [''],
      dept_id: [''],
      dept_name: ['']
    });
    this.loadRecords();
  }

  loadRecords() {
    this.apiService.getRecords(this.selectedTable).subscribe((data) => {
      this.records = data;
      this.recordForm.reset();
    });
  }

  onTableChange() {
    this.loadRecords();
  }

  createRecord() {
    const formData = this.recordForm.value;
    if (this.selectedTable === 'employees') {
      const employeeData = {
        name: formData.name,
        position: formData.position,
        salary: formData.salary
      };
      this.apiService.createRecord(this.selectedTable, employeeData).subscribe(() => {
        this.loadRecords();
        this.recordForm.reset();
      });
    } else {
      const departmentData = {
        dept_name: formData.dept_name
      };
      this.apiService.createRecord(this.selectedTable, departmentData).subscribe(() => {
        this.loadRecords();
        this.recordForm.reset();
      });
    }
  }

  updateRecord() {
    const formData = this.recordForm.value;
    if (this.selectedTable === 'employees' && formData.id) {
      const employeeData = {
        name: formData.name,
        position: formData.position,
        salary: formData.salary
      };
      this.apiService.updateRecord(this.selectedTable, formData.id, employeeData).subscribe(() => {
        this.loadRecords();
        this.recordForm.reset();
      });
    } else if (this.selectedTable === 'departments' && formData.dept_id) {
      const departmentData = {
        dept_name: formData.dept_name
      };
      this.apiService.updateRecord(this.selectedTable, formData.dept_id, departmentData).subscribe(() => {
        this.loadRecords();
        this.recordForm.reset();
      });
    }
  }

  deleteRecord(id: number) {
    this.apiService.deleteRecord(this.selectedTable, id).subscribe(() => {
      this.loadRecords();
    });
  }

  editRecord(record: any) {
    if (this.selectedTable === 'departments') {
      this.recordForm.setValue({
        dept_id: record.dept_id,
        dept_name: record.dept_name,
        id: '',
        name: '',
        position: '',
        salary: ''
      });
    } else {
      this.recordForm.setValue({
        id: record.id,
        name: record.name,
        position: record.position,
        salary: record.salary,
        dept_id: '',
        dept_name: ''
      });
    }
  }
}

// ----------------------------- MONGO DB -----------------------------------------------

// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
// import { NgIf, NgFor, CommonModule } from '@angular/common';
// import { ApiService } from '../api.service';

// @Component({
//   selector: 'app-crud',
//   templateUrl: './crud.component.html',
//   styleUrls: ['./crud.component.css'],
//   standalone: true,
//   imports: [
//     NgIf,
//     NgFor,
//     ReactiveFormsModule,
//     FormsModule,
//     HttpClientModule,
//     CommonModule
//   ],
//   providers: [ApiService],
// })
// export class CrudComponent {
//   tables = ['departments', 'employees'];
//   selectedTable = 'departments';
//   records: any[] = [];
//   recordForm: FormGroup;

//   constructor(private apiService: ApiService, private fb: FormBuilder) {
//     this.recordForm = this.fb.group({
//       id: [''],
//       name: [''],
//       position: [''],
//       salary: [''],
//       dept_id: [''],
//       dept_name: ['']
//     });
//     this.loadRecords();
//   }

//   loadRecords() {
//     this.apiService.getRecords(this.selectedTable).subscribe((data) => {
//       this.records = data;
//       this.recordForm.reset();
//     });
//   }

//   onTableChange() {
//     this.loadRecords();
//   }

//   createRecord() {
//     const formData = this.recordForm.value;
//     if (this.selectedTable === 'employees') {
//       const employeeData = {
//         name: formData.name,
//         position: formData.position,
//         salary: formData.salary
//       };
//       this.apiService.createRecord(this.selectedTable, employeeData).subscribe(() => {
//         this.loadRecords();
//         this.recordForm.reset();
//       });
//     } else {
//       const departmentData = {
//         dept_name: formData.dept_name
//       };
//       this.apiService.createRecord(this.selectedTable, departmentData).subscribe(() => {
//         this.loadRecords();
//         this.recordForm.reset();
//       });
//     }
//   }

//   updateRecord() {
//     const formData = this.recordForm.value;
//     if (this.selectedTable === 'employees' && formData.id) {
//       const employeeData = {
//         name: formData.name,
//         position: formData.position,
//         salary: formData.salary
//       };
//       this.apiService.updateRecord(this.selectedTable, formData.id, employeeData).subscribe(() => {
//         this.loadRecords();
//         this.recordForm.reset();
//       });
//     } else if (this.selectedTable === 'departments' && formData.dept_id) {
//       const departmentData = {
//         dept_name: formData.dept_name
//       };
//       this.apiService.updateRecord(this.selectedTable, formData.dept_id, departmentData).subscribe(() => {
//         this.loadRecords();
//         this.recordForm.reset();
//       });
//     }
//   }

//   deleteRecord(id: number) {
//     this.apiService.deleteRecord(this.selectedTable, id.toString()).subscribe(() => {
//       this.loadRecords();
//     });
//   }


//   editRecord(record: any) {
//     if (this.selectedTable === 'departments') {
//       this.recordForm.setValue({
//         dept_id: record._id,
//         dept_name: record.dept_name,
//         id: '',
//         name: '',
//         position: '',
//         salary: ''
//       });
//     } else {
//       this.recordForm.setValue({
//         id: record._id,
//         name: record.name,
//         position: record.position,
//         salary: record.salary,
//         dept_id: '',
//         dept_name: ''
//       });
//     }
//   }
// }
