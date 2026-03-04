import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  activeRole: string = '';
  isLoginMode: boolean = true;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  setRole(role: string) {
    this.activeRole = role;
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.loginForm.reset();
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const baseData: User = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!
    };

    if (this.isLoginMode) {
      this.authService.login(baseData).subscribe({
        next: (res) => {
          let token = res.headers.get('Authorization');

          if (token) {
            if (token.startsWith('Bearer ')) {
              token = token.substring(7);
            }
            localStorage.setItem('token', token);
            localStorage.setItem('username', baseData.username);
          }

          const rawRole = this.authService.getUserRole(token);
          const roleString = Array.isArray(rawRole) ? rawRole[0] : rawRole;
          const normalizedRole = roleString?.toString().toLowerCase() || '';

          this.toastService.show('Giriş başarılı, yönlendiriliyorsunuz...');

          if (normalizedRole.includes('teacher')) {
            this.router.navigate(['/course-create']);
          } else {
            this.router.navigate(['/course-registration']);
          }
        },
        error: (err) => {
          this.toastService.show('Giriş başarısız! Lütfen bilgilerinizi kontrol edin.');
        }
      });
    } else {
      this.authService.register(baseData, this.activeRole).subscribe({
        next: (res) => {
          let token = res.headers.get('Authorization');

          if (token) {
            if (token.startsWith('Bearer ')) {
              token = token.substring(7);
            }
            localStorage.setItem('token', token);
            localStorage.setItem('username', baseData.username);

            const role = this.authService.getUserRole(token);
            const normalizedRole = role?.toString().toLowerCase() || '';

            this.toastService.show('Hesabınız oluşturuldu ve giriş yapıldı!');

            if (normalizedRole.includes('teacher')) {
              this.router.navigate(['/course-create']);
            } else {
              this.router.navigate(['/course-registration']);
            }
          } else {
            this.toastService.show('Kayıt başarılı! Lütfen şimdi giriş yapın.');
            this.isLoginMode = true;
            this.activeRole = '';
          }
        },
        error: (err) => {
          if (err.status === 201 || err.status === 200) {
            this.toastService.show('Kayıt başarılı! Lütfen şimdi giriş yapın.');
            this.isLoginMode = true;
            this.activeRole = '';
          } else {
            this.toastService.show(`Kayıt başarısız! Hata kodu: ${err.status}`);
          }
        }
      });
    }
  }
}