import { AuthGQLService } from './../components/main/services/auth-gql.service';
import { onError } from 'apollo-link-error';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from './../../environments/environment';
import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS, Apollo} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { HttpHeaders, HttpClientModule } from '@angular/common/http';
import { ApolloLink, from } from 'apollo-link';
import { Router } from '@angular/router';

const uri = `${environment.serverUrl}/graphql`; // <-- add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink, authGQLService: AuthGQLService) {
  const http = httpLink.create({ uri });
  const tokenMiddleware = new ApolloLink((operation, forward) => {

    // Check for token
    const token = localStorage.getItem('uitoken');
    if (!token) {
      return forward(operation);
    }

    operation.setContext({
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${token}`,
      ),
    });
    return forward(operation);
  });

  const errorHandler = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => {
        console.log(message);
        // console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      });
    }
    if (networkError) {
      const errorStatus = networkError['error'].errors[0].message;
      console.log(errorStatus);
      if (errorStatus === 'Not Authenticated!') {
        authGQLService.logUserOut();
      }
    }
  });

  return {
    link: from([tokenMiddleware, errorHandler, http]),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, AuthGQLService],
    },
  ],
})

 export class GraphQLModule {}
