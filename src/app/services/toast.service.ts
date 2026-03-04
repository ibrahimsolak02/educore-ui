import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<string>('');
  toast$ = this.toastSubject.asObservable();

  show(message: string) {
    this.toastSubject.next(message);
    setTimeout(() => {
      this.toastSubject.next('');
    }, 5000);
  }
}