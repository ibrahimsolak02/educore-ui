import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080';

  login(data: User): Observable<any> {
    const url = `${this.baseUrl}/authenticate`;
    observe: 'response'
    return this.http.post(url, data, {observe: 'response'});
  }

  register(data: User, role: string) {
    const url = `${this.baseUrl}/user/register/${role}`; 
    return this.http.post(url, data);
  }
}