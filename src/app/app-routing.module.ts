import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { GuardsComponent } from './pages/guards/guards.component';
import { ClientsComponent } from './pages/clients/clients.component';


export const AppRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticatedGuard], canActivateChild: [AuthenticatedGuard], children: [
    { path: 'home', component: HomeComponent },
    { path: 'guards', component: GuardsComponent },
    { path: 'clients', component: ClientsComponent },
    { path: 'dashboard', redirectTo: 'home', pathMatch: 'full' },
  ] },
  { path: 'login', component: LoginComponent, pathMatch: 'full'  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '**', redirectTo: '/404-not-found', pathMatch: 'full' }
];
