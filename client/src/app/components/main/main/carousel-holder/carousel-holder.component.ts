import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel-holder',
  templateUrl: './carousel-holder.component.html',
  styleUrls: ['./carousel-holder.component.scss']
})
export class CarouselHolderComponent {

  constructor() { }

  customOptions: any = {
    loop: true,
    margin: 20,
    center: true,
    mouseDrag: false,
    stagePadding: 20,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText:
    ['<i class="fas fa-chevron-left"></i>',
     '<i class="fas fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: true
  };

}
