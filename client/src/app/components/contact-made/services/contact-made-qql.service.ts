import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { StaticData } from 'src/app/shared/interfaces';
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
    return this.apollo.watchQuery<{staticData: StaticData[]}>({
      query: contactmadeQueries.GET_DATA_FOR_SELECT
    })
    .valueChanges;
  }

}
