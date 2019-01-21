import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


/* export const SIGN_IN_USER = gql`
  query SignInUser($email: String!, $password: String!){
    login(email: $email, password: $password) {
      token
      userId
    }
  }
`; */

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
