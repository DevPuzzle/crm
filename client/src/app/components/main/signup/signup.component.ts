import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthGQLService } from '../services/auth-gql.service';
import { Router } from '@angular/router';

export const SIGN_UP_USER = gql`
  mutation SignUpUser($credentials: SignupInputData) {
    signup(signupInput: $credentials){
      _id
      name
      email
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
    public dialog: MatDialog,
    private router: Router,
    private authGQLService: AuthGQLService
    ) { }

  ngOnInit() {
    this.initSignupForm();
  }

  initSignupForm() {
    this.signupForm = this.fb.group({
      'name': ['', [Validators.required, Validators.minLength(2)] ],
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
          // console.log(err.networkError);
          this.isSignUpData = false;
          console.log(err);
          if (err.networkError) {
            this.errorMessage = JSON.parse(err.networkError.error.errors[0].message);
          }
          return of(null);
        })
      )
      .subscribe(
        response => {
          // notify that user registered successfully
          if (response) {
            this.isSignUpData = true;
            this.closeSignup();
            this.authGQLService
      .logUserIn(this.signupForm.value.email, this.signupForm.value.password)
      .subscribe(
        ({ data, loading }) => {
          const {login} = data;
          localStorage.setItem('uitoken', login.token);
          this.router.navigate(['/employees']);
        },
        (error) => {
          /* also need to check that this not a server error */
          if (error.networkError) {
          }
        }
      );
          }
        }
      );
  }
  closeSignup(): void {
    this.dialog.closeAll();
  }
}
