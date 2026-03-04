import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastService } from './services/toast.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  template: `
    <router-outlet></router-outlet>

    @if (toastService.toast$ | async; as message) {
      <div class="global-toast-notification">
        {{ message }}
      </div>
    }
  `,
  styles: [`
    .global-toast-notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: #34495e;
      color: white;
      padding: 15px 25px;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      z-index: 9999;
      font-weight: 500;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `]
})
export class AppComponent {
  toastService = inject(ToastService);
}