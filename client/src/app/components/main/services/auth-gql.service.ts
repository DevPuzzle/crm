import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ResponseToken } from 'src/app/shared/interfaces';
import { SIGN_IN_USER } from 'src/app/shared/gqlQueries/auth.queries';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGQLService {
  isAuthoRized = new BehaviorSubject<any>(null);

  constructor(private apollo: Apollo, private router: Router) { }

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

  logUserOut() {
    if (localStorage.getItem('uitoken')) {
      localStorage.removeItem('uitoken');
    }
    this.isAuthoRized.next(false);
    this.router.navigate(['/']);
  }
}
