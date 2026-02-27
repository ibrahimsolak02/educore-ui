import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // Varsayılan olarak Öğrenci ve Giriş modunda başlatalım
  activeRole: 'student' | 'teacher' = 'student'; 
  isLoginMode: boolean = true; 

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  // Rol değiştirme butonu tetiklendiğinde
  setRole(role: 'student' | 'teacher') {
    this.activeRole = role;
  }

  // Giriş/Kayıt modları arasında geçiş yapıldığında
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.loginForm.reset(); // Mod değiştiğinde içindeki yazıları temizle
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Seçilen role ve moda göre Spring Boot URL'ini dinamik belirliyoruz
      const url = this.activeRole === 'student'
        ? (this.isLoginMode ? '/api/student/login' : '/api/student/register')
        : (this.isLoginMode ? '/api/teacher/login' : '/api/teacher/register');

      console.log(`İstek atılacak Backend URL'i: ${url}`);
      console.log('Gönderilen Veri:', this.loginForm.value);
    }
  }
}