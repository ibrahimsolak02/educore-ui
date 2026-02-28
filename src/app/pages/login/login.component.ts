import { Component, inject } from '@angular/core'; // inject eklendi
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Servisini buradan çektiğinden emin ol
import { RegisterRequest } from '../../models/user.model'; // Modeli oluşturmuştuk

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // Servisi içeri alıyoruz (Sihirli dokunuş burası)
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

    // Backend'in beklediği formatta veriyi hazırlıyoruz
    const requestData: RegisterRequest = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!,
      role: this.activeRole
    };

    if (this.isLoginMode) {
      // GİRİŞ YAP (Senin yapacağın yerdi, birleştirdim)
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
      // KAYIT OL (Benim yerim)
      this.authService.register(requestData).subscribe({
        next: (res) => {
          console.log('Kayıt okey:', res);
          alert('Kayıt başarılı! Giriş yapabilirsin.');
          this.isLoginMode = true; 
        },
        error: (err) => {
          console.error('Kayıt patladı:', err);
          // Çift tırnak kullanınca içerideki kesme işareti sorun yaratmaz
          alert("Kayıt olunamadı, backend'i kontrol et!");
        }
      });
    }
  }
}