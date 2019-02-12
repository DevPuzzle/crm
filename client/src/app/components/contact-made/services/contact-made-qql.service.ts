import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import * as contactmadeQueries from 'src/app/shared/gqlQueries/contact-made.queries';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ContactMadeGQLService {
  errorMessage: string;
  constructor(private apollo: Apollo) { }

  getDataForSelect() {
    return this.apollo.watchQuery<{readonly}>({
      query: contactmadeQueries.GET_DATA_FOR_SELECT
    })
    .valueChanges;
  }

  createProject(projectForm) {
    console.log('projectForm', projectForm);
    return this.apollo
      .mutate({
        // refetchQueries: [{
        //   query: contactmadeQueries.GET_PROJECTS
        // }],
        mutation: contactmadeQueries.CREATE_PROJECT,
        variables: {
          projectData: projectForm
        },
        errorPolicy: 'all'
      })
      .pipe(
        catchError(err => {
          if (err.networkError) {
            this.errorMessage = err.networkError.error.errors[0].data;
            console.log(this.errorMessage);
          }
          return of(null);
        })
      )
      .subscribe(
        response => {
          if (response) {
          }
        }
      );
  }

}
