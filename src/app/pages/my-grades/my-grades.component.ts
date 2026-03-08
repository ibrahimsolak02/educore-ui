import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { GradeService } from '../../services/grade.service';
import { GradeView } from '../../models/grade-view.model';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-grades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-grades.component.html',
  styleUrl: './my-grades.component.scss'
})
export class MyGradesComponent {
  private gradeService = inject(GradeService);
  private toastService = inject(ToastService);

  gradeRecords: GradeView[] = [];

  ngOnInit() {
    this.loadMyGrades();
  }

  loadMyGrades(): void {
    this.gradeService.getmyGrades().subscribe({
      next: (res) => {
        this.gradeRecords = res;
      },
      error: (err) => {
        console.error('Hata:', err);
        this.toastService.show('Dersler yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.');
      }
    })
  }
}
