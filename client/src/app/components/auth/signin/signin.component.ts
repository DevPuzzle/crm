import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { ResponseToken } from 'src/app/shared/interfaces';
import { Router } from '@angular/router';

export const SIGN_IN_USER = gql`
  query SignInUser($email: String!, $password: String!) {
    login(email: $email, password: $password){
      userId
      token
    }
  }
`;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {
  isLoginData = true;
  signinForm: FormGroup;
  requiredFieldError = 'This is a required field';

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router) { }

  ngOnInit() {
    this.initAuthForm();
  }

  initAuthForm() {
    this.signinForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email] ],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSignIn() {
    this.apollo
      .watchQuery<{login: ResponseToken}>({
        query: SIGN_IN_USER,
        variables: {
          email: this.signinForm.value.email,
          password: this.signinForm.value.password
        },
        errorPolicy: 'all'
      })
      .valueChanges
      .pipe(
        /* TODO: think how to refactor it */
        catchError(err => {
          console.log(err.networkError);
          if (err.networkError) {
            this.isLoginData = false;
          }
          return of(null);
        })
      )
      .subscribe(({ data, loading }) => {
        const {login} = data;
        localStorage.setItem('uitoken', login.token);
        this.router.navigate(['/']);
      });
  }

}
