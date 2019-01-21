import { Component, OnInit } from '@angular/core';


/* export const SIGN_IN_USER = gql`
  query SignInUser($email: String!, $password: String!){
    login(email: $email, password: $password) {
      token
      userId
    }
  }
`; */

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
