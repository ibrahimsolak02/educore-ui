import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api';

  // Giriş Metodu
  login(data: RegisterRequest): Observable<any> {
    const url = `${this.baseUrl}/${data.role}/login`;
    return this.http.post(url, data);
  }

  // Kayıt Metodu
  register(data: RegisterRequest): Observable<any> {
    const url = `${this.baseUrl}/${data.role}/register`;
    return this.http.post(url, data);
  }
}