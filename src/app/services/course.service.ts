import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreateCourse } from "../models/create-course.model";

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

    enrollToCourse(courseId: number): Observable<any> {
        const url = `${this.baseUrl}/${courseId}`
        return this.http.post(url,courseId);
    }

    createCourse(createCourse: CreateCourse): Observable<any> {
        const url = `${this.baseUrl}/create`;
        return this.http.post(url,createCourse);
    }

    getEnrolledCourses(): Observable<any> {
        const url = `${this.baseUrl}/my-courses`;
        return this.http.get(url);
    }
}