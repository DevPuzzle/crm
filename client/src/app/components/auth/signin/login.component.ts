import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  authForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initAuthForm()
  }

  initAuthForm() {
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.authForm.value);
  }
}
