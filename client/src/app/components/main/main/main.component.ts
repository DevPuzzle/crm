import { SignupComponent } from './../signup/signup.component';
import { SigninComponent } from './../signin/signin.component';
import { Component, OnInit, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { UserGQLService } from '../../services/user-qql.service';
import { AuthorizedUser } from 'src/app/shared/interfaces';
import { AuthGQLService } from '../services/auth-gql.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  sign: boolean;
  style: object = {};
  params: object = {};
  width = 100;
  height = 100;
  user: AuthorizedUser;
  subscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private userService: UserGQLService,
    private authService: AuthGQLService,
    private router: Router
    ) {
      this.subscription =  this.authService.isAuthoRized
        .subscribe
        (isAuthoRized => {
        this.sign = isAuthoRized;
    });
    }

  ngOnInit() {
      this.userService.getAuthorizeUser()
      .subscribe(({data}) => {
        this.user = data.getAuthorizedUser;
        this.sign = true;
      }, err => {
        this.sign = false;
        console.log('not user');
      });
    this.style = {
      'position': 'absolute',
      'width': '100%',
      'height': '100%',
      'z-index': 0,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
    };

    this.params = {
      particles: {
        number: {
          value: 70,
        },
        color: {
          value: '#fff'
        },
        shape: {
          type: 'triangle',
        },
        size: {
          value: 5
        }
      }
    };

    this.activatedRoute.queryParams
    .subscribe(params => {
      if (params.auth) {
        setTimeout(() => { this.dialog.open(SigninComponent); }, 0);
      }
    });
  }

  onScroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  onShowSignupModal() {
    this.dialog.open(SignupComponent);
  }
  onShowSigninModal() {
    this.dialog.open(SigninComponent);
  }
  onCrmSystem() {
    this.router.navigate(['/employees']);
  }
  onSignout() {
    this.authService.logUserOut();
  }
}
