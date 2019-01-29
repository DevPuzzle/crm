import { SignupComponent } from './../signup/signup.component';
import { SigninComponent } from './../signin/signin.component';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  style: object = {};
  params: object = {};
  width: number = 100;
  height: number = 100;

  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
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
      if(params.auth) {
        setTimeout(() => {this.dialog.open(SigninComponent)}, 0);
      }
    })
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
}
