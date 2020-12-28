import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GuardsComponent } from './pages/guards/guards.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { CreateGuardComponent } from './pages/create-guard/create-guard.component';
import { CreateClientComponent } from './pages/create-client/create-client.component';
import { CreateShiftComponent } from './pages/create-shift/create-shift.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoadingPipe } from './pipes/loading.pipe';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { MaterializeModule } from 'angular2-materialize';
import {DpDatePickerModule} from 'ng2-date-picker';
import { ShiftsComponent } from './pages/shifts/shifts.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    NavbarComponent,
    SideMenuComponent,
    GuardsComponent,
    ClientsComponent,
    CreateGuardComponent,
    CreateClientComponent,
    CreateShiftComponent,
    ProfileComponent,
    LoadingPipe,
    ShiftsComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    MaterializeModule,
    DpDatePickerModule,
    RouterModule.forRoot(AppRoutes, { useHash: true, scrollPositionRestoration: 'enabled' }),
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
