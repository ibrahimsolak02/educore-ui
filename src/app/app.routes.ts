import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CourseRegistrationComponent } from './pages/course-registration/course-registration.component';
import { CourseCreateComponent } from './pages/course-create/course-create.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'course-registration', component: CourseRegistrationComponent},
  { path: 'course-create', component: CourseCreateComponent}
];
