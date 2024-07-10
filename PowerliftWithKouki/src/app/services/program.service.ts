import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  private baseUrl = 'http://localhost:8080/api/programs'; // Base URL for your backend API

  constructor(private http: HttpClient) { }

  createProgram(programRequestDTO: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, programRequestDTO);
  }

  getAllPrograms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getall`);
  }
}
