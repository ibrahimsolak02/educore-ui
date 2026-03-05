import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CourseRegistrationComponent } from './pages/course-registration/course-registration.component';
import { CourseCreateComponent } from './pages/course-create/course-create.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component'; 
import { authGuard } from './guards/auth.guard';
import { MyCoursesComponent } from './pages/my-courses/my-courses.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: '', 
    component: MainLayoutComponent,
    children: [
      { 
        path: 'course-registration', 
        component: CourseRegistrationComponent,
        canActivate: [authGuard],
        data: { roles: ['student'] }
      },
      { 
        path: 'course-create', 
        component: CourseCreateComponent,
        canActivate: [authGuard],
        data: { roles: ['teacher'] }
      },
      {
        path: 'my-courses', 
        component: MyCoursesComponent,
        canActivate: [authGuard],
        data: { roles: ['student'] }
      }
    ]
  },
  { path: '**', redirectTo: 'login' }
];