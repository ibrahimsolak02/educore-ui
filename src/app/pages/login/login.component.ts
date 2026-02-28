import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);

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
    const requestData: RegisterRequest = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!,
      role: this.activeRole
    };

    if (this.isLoginMode) {
      this.authService.login(requestData).subscribe({
        next: (res) => {
          console.log('Giriş okey:', res);
          alert('Giriş başarılı!');
        },
        error: (err) => {
          console.error('Giriş patladı:', err);
          alert('Kullanıcı adı veya şifre yanlış!');
        }
      });
    } else {
      this.authService.register(requestData).subscribe({
        next: (res) => {
          console.log('Kayıt okey:', res);
          alert('Kayıt başarılı! Giriş yapabilirsin.');
          this.isLoginMode = true; 
        },
        error: (err) => {
          console.error('Kayıt patladı:', err);
          alert("Kayıt olunamadı, backend'i kontrol et!");
        }
      });
    }
  }
}