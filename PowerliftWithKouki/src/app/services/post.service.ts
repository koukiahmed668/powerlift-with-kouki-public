import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostDTO } from './PostDTO';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8080/api/posts'; // Adjust this URL if your backend is hosted elsewhere

  constructor(private http: HttpClient) { }

  // Method to create a new post
  createPost(postDTO: PostDTO, userId: number): Observable<PostDTO> {
    return this.http.post<PostDTO>(`${this.apiUrl}/createpost?userId=${userId}`, postDTO);
  }

  // Method to fetch all posts
  getAllPosts(): Observable<PostDTO[]> {
    return this.http.get<PostDTO[]>(`${this.apiUrl}/getallposts`);
  }

  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletepost/${postId}`);
  }
  
}
