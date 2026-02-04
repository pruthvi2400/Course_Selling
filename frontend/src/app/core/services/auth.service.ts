import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

interface AuthResponse {
  token: string;
  role: 'USER' | 'ADMIN';
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = `${environment.apiBaseUrl}/auth`;
  private userSubject = new BehaviorSubject<User | null>(this.getStoredUser());
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  signup(payload: { email: string; password: string; role: 'USER' | 'ADMIN' }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/signup`, payload).pipe(
      tap((response) => this.handleAuth(response))
    );
  }

  login(payload: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, payload).pipe(
      tap((response) => this.handleAuth(response))
    );
  }

  logout(): void {
    localStorage.removeItem('course_auth');
    this.userSubject.next(null);
  }

  get token(): string | null {
    return this.userSubject.value?.token ?? null;
  }

  get role(): 'USER' | 'ADMIN' | null {
    return this.userSubject.value?.role ?? null;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleAuth(response: AuthResponse): void {
    const user: User = {
      email: response.email,
      role: response.role,
      token: response.token
    };
    localStorage.setItem('course_auth', JSON.stringify(user));
    this.userSubject.next(user);
  }

  private getStoredUser(): User | null {
    const raw = localStorage.getItem('course_auth');
    return raw ? (JSON.parse(raw) as User) : null;
  }
}
