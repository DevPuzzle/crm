import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthGQLService } from '../services/auth-gql.service';
import { MatDialog } from '@angular/material';

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
    private authGQLService: AuthGQLService,
    private router: Router,
    public dialog: MatDialog
    ) { }

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
      this.authGQLService
      .logUserIn(this.signinForm.value.email, this.signinForm.value.password)
      .subscribe(
        ({ data, loading }) => {
          const {login} = data;
          localStorage.setItem('uitoken', login.token);
          this.closeSignin();
          this.router.navigate(['/employees']);
        },
        (error) => {
          /* also need to check that this not a server error */
          if (error.networkError) {
            this.isLoginData = false;
          }
        }
      );
  }

  closeSignin(): void {
    this.dialog.closeAll();
  }
}
