import { Route } from '@angular/router';
import { CoffeeDashboardComponent } from './view/coffee-dashboard-component/coffee-dashboard.component';
import { LoginComponent } from './view/login-component/login.component';
import { AdminPanelComponent } from './view/admin-panel-component/admin-panel.component';
import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Route[] = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path:'dashboard', component: CoffeeDashboardComponent},
  {path:'login', component: LoginComponent},
  {path:'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard]}
];
