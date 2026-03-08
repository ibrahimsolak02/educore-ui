import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { GradeSubmission } from '../../models/grade-submission.model';
import { ToastService } from '../../services/toast.service';
import { GradeService } from '../../services/grade.service';

@Component({
  selector: 'app-grade-submission',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grade-submission.component.html',
  styleUrl: './grade-submission.component.scss'
})
export class GradeSubmissionComponent implements OnInit {
  private courseService = inject(CourseService);
  private gradeService = inject(GradeService);
  private toastService = inject(ToastService);

  enrollments: GradeSubmission[] = [];

  letterGrades: string[] = [
    "A+", "A", "A-", 
    "B+", "B", "B-", 
    "C+", "C", "C-", 
    "D+", "D", "D-", 
    "F"
  ];

  ngOnInit(): void {
    this.loadEnrollments();
  }

  loadEnrollments(): void {
    this.courseService.getAllEnrollments().subscribe({
      next: (res) => {
        this.enrollments = res;
      },
      error: (err) => {
        console.log("Hata", err);
        this.toastService.show("Kayıtlar yüklenirken hata oluştu");
      }
    });
  }

  saveRow(enrollment: GradeSubmission): void {
    this.gradeService.submitGrade(enrollment).subscribe({
      next: (res) => {
        console.log("Başarıyla kaydedildi");
        this.toastService.show("Başarıyla kaydedildi");
      },
      error: (err) => {
        console.log("Not kaydedilemedi");
        this.toastService.show("Not kaydedilemedi");
      }
    })
  }

  saveBulk(enrollments: GradeSubmission[]): void {
  }
}