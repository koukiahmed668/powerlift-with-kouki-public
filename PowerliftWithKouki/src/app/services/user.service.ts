import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface UserDTO {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/users';
  private jwtToken: string | null = null;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  setToken(token: string): void {
    localStorage.setItem('accessToken', token);
    this.jwtToken = token;
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  register(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/register`, user, { headers });
  }

  login(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/login`, user, { headers }).pipe(
      tap(response => {
        if (response && response.jwt) {
          this.setToken(response.jwt); // Extract the jwt property
        } else {
        }
      })
    );
  }

  getLoggedInUserId(): number | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.userId;
    }
    return null;
  }
  
  getLoggedInUser(): Observable<UserDTO> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.get<UserDTO>(`${this.apiUrl}/me`, { headers });
  }
}
