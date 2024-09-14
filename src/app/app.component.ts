import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'genesis';
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  name:string = "Juan";
  lastName:string = "Encabo";
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.token$.subscribe(token => {
      if (token) {
        this.isLoggedIn = true;
        const payload = this.authService.decodeToken(token);
        this.isAdmin = payload.rol === 1; // Verifica si el rol es admin
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
