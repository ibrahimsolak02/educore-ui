import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

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

          if (normalizedRole.includes('teacher')) {
            this.router.navigate(['/course-create']);
          } else {
            this.router.navigate(['/course-registration']);
          }
        },
        error: (err) => {
          console.error('Giriş başarısız:', err);
          alert('Giriş başarısız! Lütfen bilgilerinizi kontrol edin.');
        }
      });
    } else {
      this.authService.register(baseData, this.activeRole).subscribe({
        next: (res) => {
          console.log('Kayıt olundu', res);

          let token = res.headers.get('Authorization');

          if (token) {
            if (token.startsWith('Bearer ')) {
              token = token.substring(7);
            }
            localStorage.setItem('token', token);
            localStorage.setItem('username', baseData.username);

            const role = this.authService.getUserRole(token);
            const normalizedRole = role?.toString().toLowerCase() || '';

            alert('Hesabınız oluşturuldu ve giriş yapıldı!');

            if (normalizedRole.includes('teacher')) {
              this.router.navigate(['/course-create']);
            } else {
              this.router.navigate(['/course-registration']);
            }
          } else {
            alert('Kayıt başarılı! Lütfen şimdi giriş yapın.');
            this.isLoginMode = true;
            this.activeRole = '';
          }
        },
        error: (err) => {
          console.error('Kayıt başarısız', err);
          alert('Kayıt başarısız! Bu kullanıcı adı alınmış olabilir.');
        }
      });
    }
  }
}