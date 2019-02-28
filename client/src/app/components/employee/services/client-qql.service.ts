import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Client } from 'src/app/shared/interfaces';
import { Project } from 'src/app/shared/interfaces';
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
    return this.apollo.watchQuery<{client: Client, projectsByClient: Project[]}>({
      query: clientsQueries.GET_CLIENT_BY_ID,
      variables: {
        id: id
      }
    })
    .valueChanges;
  }

  // ProjectsByClient(id: string) {
  //   return this.apollo.watchQuery<{client: Client}>({
  //     query: clientsQueries.GET_PROJECTS_BY_CLIENT,
  //     variables: {
  //       id: id
  //     }
  //   })
  //   .valueChanges;
  // }

  createClient(clientForm) {
    return this.apollo
      .mutate({
        refetchQueries: [{
          query: clientsQueries.GET_CLIENTS_LIST
        }],
        mutation: clientsQueries.CREATE_CLIENT,
        variables: {
          clientData: clientForm
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

  updateClient(clientForm, id) {
    return this.apollo
      .mutate({
        refetchQueries: [
          { query: clientsQueries.GET_CLIENT_BY_ID,  variables: {id: id} },
          { query: clientsQueries.GET_CLIENTS_LIST }
        ],
        mutation: clientsQueries.UPDATE_CLIENT,
        variables: {
          clientData: clientForm,
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

  deleteClient(id) {
    return this.apollo
      .mutate({
        refetchQueries: [
          { query: clientsQueries.GET_CLIENTS_LIST }
        ],
        mutation: clientsQueries.DELETE_CLIENT,
        variables: {
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
