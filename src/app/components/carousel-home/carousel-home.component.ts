import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel-home',
  templateUrl: './carousel-home.component.html',
  styleUrls: ['./carousel-home.component.css']
})
export class CarouselHomeComponent {
  images = [
    'assets/images/bgc1.jpg',
    'assets/images/bgc2.jpg',
    'assets/images/bgc3.jpg',
    'assets/images/bgc4.jpg',
    'assets/images/bgc5.jpg'
  ];

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    arrows: false,
    mobileFirst: true
  };
}
