import { UserGQLService } from './../services/user-qql.service';
import { AuthGQLService } from './../main/services/auth-gql.service';
import { Component, OnInit } from '@angular/core';
import { HeaderLink, AuthorizedUser } from 'src/app/shared/interfaces';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  links: HeaderLink[];
  user: AuthorizedUser;
  // sign: boolean;
  // isSing: any;
  // subscription: Subscription;

  constructor(
    private authService: AuthGQLService,
    private userService: UserGQLService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.userService.getAuthorizeUser()
    .subscribe(({data}) => {
      this.user = data.getAuthorizedUser;
    });

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

  onSignout() {
    this.authService.logUserOut();
  }
}
