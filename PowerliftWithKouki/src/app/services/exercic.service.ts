import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciceService {

  private apiUrl = 'http://localhost:8080/api/exercices';

  constructor(private http: HttpClient) { }

  // Method to create an Exercice
  createExercice(exerciceDTO: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, exerciceDTO);
  }

  // Method to get all Exercices
  getAllExercices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Method to get an Exercice by id
  getExerciceById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  // Method to delete an Exercice by id
  deleteExercice(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  searchExercices(query: string): Observable<any[]> {
    const url = `${this.apiUrl}/search?query=${query}`;
    return this.http.get<any[]>(url);
  }
}
