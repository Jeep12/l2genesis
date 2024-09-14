import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VerifyAccountComponent } from './components/verifyaccount/verifyaccount.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { PanelControlComponent } from './components/panel-control/panel-control.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { DownloadComponent } from './components/download/download.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify-account', component: VerifyAccountComponent },
  { path: 'home', component: HomeComponent },
  { path: 'download', component: DownloadComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Protege todas las rutas hijas aquí
    children: [
      {
        path: 'panel-control',
        component: PanelControlComponent,
        canActivate: [AuthGuard, RoleGuard] // Solo admin puede acceder a esta ruta
      },
      {
        path: 'create-account-client',
        component: CreateAccountComponent,
        canActivate: [AuthGuard]
      },

    ]
  },
  { path: '**', redirectTo: 'login' } // Redirige cualquier ruta desconocida al login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
