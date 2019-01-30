import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const SIGN_UP_USER = gql`
  mutation SignUpUser($credentials: UserInputData) {
    createUser(userInput: $credentials){
      _id,
      email,
      company_id
    }
  }
`;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  isSignUpData = true;
  signupForm: FormGroup;
  errorMessage: string;
  requiredFieldError = 'This is a required field';

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.initSignupForm();
  }

  initSignupForm() {
    this.signupForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email] ],
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'company_name': ['', Validators.required]
    });
  }

  onSignUp() {
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
          this.isSignUpData = false;
          if (err.networkError) {
            this.errorMessage = err.networkError.error.errors[0].data;
            console.log(this.errorMessage);
            this.snackBar.open(
              this.errorMessage,
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
            this.isSignUpData = true;
          }
        }
      );
  }
  closeSignup(): void {
    this.dialog.closeAll();
  }
}
