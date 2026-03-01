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

  activeRole: 'student' | 'teacher' = 'student'; 
  isLoginMode: boolean = true; 

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  setRole(role: 'student' | 'teacher') {
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
          const token = res.headers.get('Authorization');
          if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('username', baseData.username);
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
          alert('Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
          this.isLoginMode = true;
        },
        error: (err) => {
          console.error('Kayıt başarısız', err);
          alert('Kayıt başarısız! Bu kullanıcı adı alınmış olabilir.');
        }
      });
    }
  }
}