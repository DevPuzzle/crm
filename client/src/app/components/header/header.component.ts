import { Component, OnInit } from '@angular/core';
import { HeaderLink } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  links: HeaderLink[];
  constructor() { }

  ngOnInit() {
    this.links = [
      {
        link: '/letters',
        label: 'Cover letters',
        icon: 'far fa-envelope-open'
      },
      {
        link: '/contact-made',
        label: 'Contact Made',
        icon: 'far fa-check-square'
      },
      {
        link: '/clients',
        label: 'Clients',
        icon: 'fas fa-user-tie'
      },
      {
        link: '/employees',
        label: 'Employees',
        icon: 'fas fa-users'
      }
    ];
  }

}
