import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { GradeSubmission } from "../models/grade-submission.model";

@Injectable({
    providedIn: 'root'
})

export class GradeService {
    private http = inject(HttpClient);
    private baseUrl = 'http://localhost:8080/grade';

    submitGrade(grade: GradeSubmission): Observable<any> {
        const url = `${this.baseUrl}/submit`;
        return this.http.post(url, grade);
    }

    submitAllGrades(gradeList: GradeSubmission[]): Observable<any> {
        const url = `${this.baseUrl}/submit-all`;
        return this.http.post(url, gradeList)
    }

}