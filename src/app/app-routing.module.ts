import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './service/guards/auth-guard.service';
import { AdminComponent } from './admin/admin.component';
import { AdminGuardService } from './service/guards/admin-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]//only authenticated user can visit this route.
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService, AdminGuardService]//only authenticated and authorised  user can visit this route.
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
