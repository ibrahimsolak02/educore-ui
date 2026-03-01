import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
    private http = inject(HttpClient);
    private baseUrl = 'http://localhost:8080/course';

    getAllCourses(): Observable<any> {
        const url = `${this.baseUrl}/all`;
        return this.http.get(url);
    }
}