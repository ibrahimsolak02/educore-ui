import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { CreateCourse } from '../../models/create-course.model';

@Component({
  selector: 'app-course-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './course-create.component.html',
  styleUrl: './course-create.component.scss'
})
export class CourseCreateComponent {

  private courseService = inject(CourseService);

  courseForm = new FormGroup({
    courseName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    capacity: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    description: new FormControl<string | null>('')
  });

  onSubmit() {
    if (this.courseForm.valid) {
      const formVerisi = this.courseForm.getRawValue(); 

      const newCourse: CreateCourse = {
        name: formVerisi.courseName, 
        capacity: formVerisi.capacity!,
        description: formVerisi.description
      };

      this.courseService.createCourse(newCourse).subscribe({
        next: (res) => {
          console.log("Ders oluşturuldu", res);
          alert("Ders başarıyla oluşturuldu");
          this.courseForm.reset();
        },
        error: (err) => {
          console.error("Ders oluşturulamadı", err);
          alert("Ders oluşturulurken bir hata meydana geldi");
        }
      });
    } else {
      alert("Lütfen zorunlu alanları doldurun.");
    }
  }
}