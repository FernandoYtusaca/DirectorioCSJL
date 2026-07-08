import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login'; // Asegúrate de que la ruta apunte bien a tu archivo
import { DashboardComponent } from './pages/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'dashboard', component: DashboardComponent}
];