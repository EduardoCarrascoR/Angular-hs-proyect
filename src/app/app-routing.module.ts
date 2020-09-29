import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { GuardsComponent } from './pages/guards/guards.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { CreateGuardComponent } from './pages/create-guard/create-guard.component';
import { CreateClientComponent } from './pages/create-client/create-client.component';


export const AppRoutes: Routes = [
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticatedGuard], canActivateChild: [AuthenticatedGuard], children: [
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: 'home', component: HomeComponent },
    { path: 'guards', component: GuardsComponent },
    { path: 'createGuard', component: CreateGuardComponent },
    { path: 'clients', component: ClientsComponent },
    { path: 'createClient', component: CreateClientComponent },
    { path: 'dashboard', redirectTo: '/dashboard/home', pathMatch: 'full' },
  ] },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '**', redirectTo: '/404-not-found', pathMatch: 'full' }
];
