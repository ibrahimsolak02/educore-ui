import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { CourseService } from '../../services/course.service';
import { CourseRegister } from '../../models/course-register.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-course-registration',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-registration.component.html',
  styleUrls: ['./course-registration.component.scss']
})
export class CourseRegistrationComponent implements OnInit {
  private courseService = inject(CourseService);
  private toastService = inject(ToastService);

  courses: CourseRegister[] = [];
  isLoading: boolean = true;
  currentUserName: string = '';

  ngOnInit(): void {
    this.loadCourses();
    this.currentUserName = localStorage.getItem('username') || 'Öğrenci';
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Hata:', err);
        this.toastService.show('Dersler yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.');
        this.isLoading = false;
      }
    });
  }

  enrollToCourse(courseId: number): void {
    this.courseService.enrollToCourse(courseId).subscribe({
      next: (res) => {
        console.log('Kayıt başarılı, güncel kurs bilgisi:', res);
        alert("Kursa başarıyla kayıt oldunuz!");
        this.loadCourses();
      },
      error: (err) => {
        console.error('Kayıt sırasında hata oluştu:', err);
        alert("Kayıt yapılamadı. Lütfen tekrar deneyin.");
      }
    });
  }
}