import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa FormsModule para manejar formularios
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule para realizar solicitudes HTTP

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component'; // Asegúrate de que la ruta sea correcta
import { AuthService } from './services/auth.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { FirebaseCheckComponentComponent } from './components/firebase-check-component/firebase-check-component.component'; // Asegúrate de que tengas un archivo environment configurado

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoaderComponent } from './components/loader/loader.component';
import { VerifyAccountComponent } from './components/verifyaccount/verifyaccount.component';
import { PanelControlComponent } from './components/panel-control/panel-control.component';
import { DownloadComponent } from './components/download/download.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { AboutComponent } from './components/about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    HomeComponent,
    RegisterComponent,
    FirebaseCheckComponentComponent,
    DashboardComponent,
    VerifyAccountComponent,
    LoaderComponent,
    PanelControlComponent,
    DownloadComponent,
    CreateAccountComponent,
    AboutComponent,

    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    BrowserAnimationsModule,


  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
