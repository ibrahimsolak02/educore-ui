import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const toastService = inject(ToastService);

  const token = localStorage.getItem('token');

  if (!token) {
    toastService.show('Lütfen önce giriş yapın!');
    router.navigate(['/login']);
    return false;
  }

  const rawRole = authService.getUserRole(token);
  const roleString = Array.isArray(rawRole) ? rawRole[0] : rawRole;
  const userRole = roleString?.toString().toLowerCase() || '';

  const expectedRoles = route.data['roles'] as Array<string>;

  if (expectedRoles && expectedRoles.length > 0) {
    const hasRole = expectedRoles.some(r => userRole.includes(r.toLowerCase()));
    
    if (!hasRole) {
      toastService.show('Bu sayfaya erişim yetkiniz yok.');
      
      if (userRole.includes('teacher')) {
        router.navigate(['/course-create']);
      } else {
        router.navigate(['/course-registration']);
      }
      return false;
    }
  }

  return true;
};