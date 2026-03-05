import { Component, OnInit, inject } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';
import { CourseRegister } from '../../models/course-register.model';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.scss'
})
export class MyCoursesComponent implements OnInit {
  private courseService = inject(CourseService);
  private toastService = inject(ToastService);

  myCourses: CourseRegister[] = [];
  isLoading: boolean = true;
  currentUserName: string = '';

  ngOnInit() {
    this.loadEnrolledCourse();
    this.currentUserName = localStorage.getItem('username') || 'Öğrenci';
  }

  loadEnrolledCourse(): void {
    this.courseService.getEnrolledCourses().subscribe({
      next: (res) => {
        this.myCourses = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Hata:', err);
        this.toastService.show('Dersler yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.');
        this.isLoading = false;
      }
    })
  }
}