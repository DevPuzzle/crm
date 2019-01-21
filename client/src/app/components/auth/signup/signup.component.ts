import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const SIGN_UP_USER = gql`
  mutation SignUpUser($credentials: UserInputData) {
    createUser(userInput: $credentials){
      _id,
      email
    }
  }
`;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private apollo: Apollo,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.initAuthForm();
  }

  initAuthForm() {
    this.signupForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  onSignUp() {
    console.log(this.signupForm.value);
    this.apollo
      .mutate({
        mutation: SIGN_UP_USER,
        variables: {
          credentials: this.signupForm.value
        },
        errorPolicy: 'all'
      })
      .pipe(
        /* TODO: think how to refactor it */
        catchError(err => {
          console.log(err.networkError);
          if(err.networkError) {
            const errorMessage = err.networkError.error.errors[0].message;
            this.snackBar.open(
              errorMessage,
              'Dismiss'
            )
          }
          return of([])
        })
      )
      .subscribe( 
        _ => {
          // notify that user registered successfully
          this.snackBar.open(
            'Successfully signed up, you can now sign in'
          )
        }
      )
  }

}
