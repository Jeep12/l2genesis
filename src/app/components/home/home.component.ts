import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private images: string[] = [
    '../../../assets/images/bgc1.jpg',
    '../../../assets/images/bgc5.jpg',
    '../../../assets/images/bgc3.jpg',
    '../../../assets/images/bgc4.jpg'
  ];
  private currentIndex = 0;
  private intervalId: any;
  backgroundImage = `url(${this.images[this.currentIndex]})`;

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId); // Limpia el intervalo al destruir el componente
  }

  private startCarousel() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.backgroundImage = `url(${this.images[this.currentIndex]})`;
    }, 5500); // Cambia cada 2.5 segundos
  }
}
