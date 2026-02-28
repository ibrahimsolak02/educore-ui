import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

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
    const baseData : User = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!
    };

    if (this.isLoginMode) {
      this.authService.login(baseData).subscribe({
        next: (res) => {
          console.log('Giriş başarılı:', res);
          alert('Giriş başarılı!');
        },
        error: (err) => {
          console.error('Giriş başarısız:', err);
          alert('Giriş başrısız!');
        }
      });
    } else {
      this.authService.register(baseData,this.activeRole).subscribe({
        next: (res) => {
          console.log('Kayıt olundu', res);
          alert('Kayıt başarılı');
        },
        error: (err) => {
          console.error('Kayıt başarısız', err);
          alert('Kayıt başarısız')
        }
      })
    }
  }
}