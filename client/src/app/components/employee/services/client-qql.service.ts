import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Client } from 'src/app/shared/interfaces';
import * as clientsQueries from 'src/app/shared/gqlQueries/clients.queries';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClientGQLService {
  errorMessage: string;
  constructor(private apollo: Apollo) { }

  getAllClients() {
    return this.apollo.watchQuery<{clients: Client[]}>({
      query: clientsQueries.GET_CLIENTS_LIST
    })
    .valueChanges;
  }

  getClientById(id: string) {
    return this.apollo.watchQuery<{client: Client}>({
      query: clientsQueries.GET_CLIENT_BY_ID,
      variables: {
        id: id
      }
    })
    .valueChanges;
  }

}
