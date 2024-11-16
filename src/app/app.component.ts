import { Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'; // Importa el servicio Title
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoading = false;
  showScrollBtn = false; 

  constructor(private router: Router, private titleService: Title) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateTitle(); // Actualiza el título cuando termina la navegación
        // Cuando termina la navegación, se oculta el preload después de un breve retraso
        setTimeout(() => {
          this.isLoading = false; // Desactiva el preload
        }, 800); // Ajusta este tiempo según la duración de la animación
      }
    });
  }

  ngOnInit(): void {
    this.updateTitle(); // Establece el título al cargar la página
  }


  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Desplazamiento suave
    });
  }

  // También puedes agregar un método para mostrar/ocultar el botón según el scroll
  shouldShowScrollBtn(): boolean {
    return document.documentElement.scrollTop > 56;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Actualiza la visibilidad del botón al hacer scroll
    this.showScrollBtn = document.documentElement.scrollTop > 86; // Mostrar si ha scrolleado más de 100px
  }


  private updateTitle() {
    let pageTitle = 'L2Terra'; // Título base

    // Cambia el título según la ruta actual
    switch (this.router.url) {
      case '/':
        pageTitle += ' - Home';
        break;
      case '/login':
        pageTitle += ' - Login';
        break;
      case '/register':
        pageTitle += ' - Register';
        break;
      case '/verify-account':
        pageTitle += ' - Verify Account';
        break;
      case '/home':
        pageTitle += ' - Home';
        break;
      case '/download':
        pageTitle += ' - Download';
        break;
      case '/dashboard':
        pageTitle += ' - Dashboard';
        break;
      case '/dashboard/panel-control':
        pageTitle += ' - Panel Control';
        break;
      case '/dashboard/create-account-client':
        pageTitle += ' - Create Account Client';
        break;
        case '/dashboard/my-accounts':
          pageTitle += ' - My Accounts';
          break;
      default:
        pageTitle += ' - Página Desconocida';
        break;
    }
 
    this.titleService.setTitle(pageTitle); // Establece el título actualizado
  }

  onActivate() {
    this.isLoading = true; // Activa el preload al activar una nueva ruta
  }

  navigateTo(link: string) {
    this.isLoading = true; // Activa el preload al navegar
    this.router.navigate([link]);
  }
}
