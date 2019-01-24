import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ResponseToken } from 'src/app/shared/interfaces';
import { SIGN_IN_USER } from 'src/app/shared/gqlQueries/auth.queries';

@Injectable({
  providedIn: 'root'
})

export class AuthGQLService {

  constructor(private apollo: Apollo) { }

  logUserIn(email: string, password: string) {
    return this.apollo
      .watchQuery<{login: ResponseToken}>({
        query: SIGN_IN_USER,
        variables: {
          email: email,
          password: password
        },
        errorPolicy: 'all'
      })
      .valueChanges;
  }
}
