import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

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

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.initAuthForm();
  }

  initAuthForm() {
    this.signinForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  onSignIn() {
    console.log(this.signinForm.value);
    this.apollo
      .watchQuery({
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
            const errorMessage = err.networkError.error.errors[0].message;
            this.snackBar.open(
              errorMessage,
              'Dismiss'
            );
          }
          return of(null);
        })
      )
      .subscribe(
        response => {
          // notify that user registered successfully
          if (response) {
            this.isLoginData = true;
          }
          // else {this.snackBar.open(
          //   'ERROR'
          // ); }
        }
      );
  }

}
