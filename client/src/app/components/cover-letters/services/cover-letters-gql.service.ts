import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CoverLetter } from 'src/app/shared/interfaces';
import * as coverLettersQueries from 'src/app/shared/gqlQueries/coverletters.queries';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoverLetterGQLService {
  errorMessage: string;
  constructor(private apollo: Apollo) { }

  getCoverLetters() {
    return this.apollo.watchQuery<{coverLetters: CoverLetter[]}>({
      query: coverLettersQueries.GET_COVERLETTER_LIST
    })
    .valueChanges;
  }

  getCoverLetterById(id: string) {
    return this.apollo.watchQuery<{coverLetter: CoverLetter}>({
      query: coverLettersQueries.GET_COVERLETTER_BY_ID,
      variables: {
        id: id
      }
    })
    .valueChanges;
  }

  createCoverLetter(coverLetterForm) {
    return this.apollo
      .mutate({
        refetchQueries: [{
          query: coverLettersQueries.GET_COVERLETTER_LIST
        }],
        mutation: coverLettersQueries.CREATE_COVERLETTER,
        variables: {
          CoverLetterData: coverLetterForm
        },
        errorPolicy: 'all'
      })
      .pipe(
        catchError(err => {
          if (err.networkError) {
            this.errorMessage = err.networkError.error.errors[0].data;
            // console.log(this.errorMessage);
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

  updateCoverLetter(coverLetterForm, id) {
    return this.apollo
      .mutate({
        refetchQueries: [
          { query: coverLettersQueries.GET_COVERLETTER_LIST }
        ],
        mutation: coverLettersQueries.UPDATE_COVERLETTER,
        variables: {
          coverLetterData: coverLetterForm,
          id: id
        },
        errorPolicy: 'all'
      })
      .pipe(
        catchError(err => {
          if (err.networkError) {
            this.errorMessage = err.networkError.error.errors[0].data;
            // console.log(this.errorMessage);
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
