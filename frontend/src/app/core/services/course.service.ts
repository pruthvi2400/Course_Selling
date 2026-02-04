import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private readonly baseUrl = `${environment.apiBaseUrl}/courses`;

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl);
  }

  getCourse(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/${id}`);
  }

  createCourse(payload: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(this.baseUrl, payload);
  }

  updateCourse(id: string, payload: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}/${id}`, payload);
  }

  purchaseCourse(id: string): Observable<{ message: string }>
  {
    return this.http.post<{ message: string }>(`${this.baseUrl}/${id}/purchase`, {});
  }

  getPurchasedCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${environment.apiBaseUrl}/users/purchased-courses`);
  }
}
