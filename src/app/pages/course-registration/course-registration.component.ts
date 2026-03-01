import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-registration',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-registration.component.html',
  styleUrls: ['./course-registration.component.scss']
})
export class CourseRegistrationComponent implements OnInit {
  private courseService = inject(CourseService);

  courses: Course[] = [];
  isLoading: boolean = true;
  currentUserName: String = '';

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
        this.isLoading = false;
      }
    });
  }

  registerToCourse(course: Course): void {
    alert(`${course.name} dersine başarıyla kayıt oldunuz!`);
  }
}