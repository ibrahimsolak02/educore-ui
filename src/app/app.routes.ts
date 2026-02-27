import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Site açılınca direkt login'e at
  { path: 'login', component: LoginComponent }          // /login yazılınca bu component çalışsın
];