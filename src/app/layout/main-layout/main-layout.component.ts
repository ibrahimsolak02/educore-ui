import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive], // RouterLink'leri unutmamak önemli
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  userRole: string = '';
  username: string = '';

  ngOnInit() {
    this.username = localStorage.getItem('username') || 'Kullanıcı';
    const token = localStorage.getItem('token');
    
    if (token) {
      const rawRole = this.authService.getUserRole(token);
      const roleString = Array.isArray(rawRole) ? rawRole[0] : rawRole;
      this.userRole = roleString?.toString().toLowerCase() || '';
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}