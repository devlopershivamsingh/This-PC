import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getRecords(table: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${table}`);
  }

  getRecordById(table: string, id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${table}/${id}`);
  }

  createRecord(table: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${table}`, data);
  }

  updateRecord(table: string, id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${table}/${id}`, data);
  }

  deleteRecord(table: string, id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${table}/${id}`);
  }
  
}





// ----------------------- MONGODB ------------------------------------------------

// src/app/api.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {
//   private baseUrl = 'http://localhost:5000/api';

//   constructor(private http: HttpClient) { }

//   getRecords(tableName: string): Observable<any[]> {
//     const endpoint = tableName === 'departments' ? 'departments' : 'employees';
//     return this.http.get<any[]>(`${this.baseUrl}/${endpoint}`);
//   }

//   getRecordById(tableName: string, id: string): Observable<any> {
//     const endpoint = tableName === 'departments' ? 'departments' : 'employees';
//     return this.http.get<any>(`${this.baseUrl}/${endpoint}/${id}`);
//   }

//   createRecord(tableName: string, record: any): Observable<any> {
//     const endpoint = tableName === 'departments' ? 'departments' : 'employees';
//     return this.http.post<any>(`${this.baseUrl}/${endpoint}`, record);
//   }

//   updateRecord(tableName: string, id: string, record: any): Observable<any> {
//     const endpoint = tableName === 'departments' ? 'departments' : 'employees';
//     return this.http.put<any>(`${this.baseUrl}/${endpoint}/${id}`, record);
//   }

//   deleteRecord(tableName: string, id: string): Observable<any> {
//     const endpoint = tableName === 'departments' ? 'departments' : 'employees';
//     return this.http.delete<any>(`${this.baseUrl}/${endpoint}/${id}`);
//   }
// }