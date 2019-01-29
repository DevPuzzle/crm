import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { AuthorizedUser } from 'src/app/shared/interfaces';
import * as userQueries from 'src/app/shared/gqlQueries/auth.queries';

@Injectable({
  providedIn: 'root'
})
export class UserGQLService {
  errorMessage: string;
  constructor(private apollo: Apollo) { }

  getAuthorizeUser() {
    console.log('getAuthorizeUser WORK!');
    return this.apollo.watchQuery<{getAuthorizedUser: AuthorizedUser}>({
      query: userQueries.GET_AUTHORIZED_USER
    }).valueChanges;
  }
}
