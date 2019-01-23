import { BrowserModule } from '@angular/platform-browser';
import { environment } from './../../environments/environment';
import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS, Apollo} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { HttpHeaders, HttpClientModule } from '@angular/common/http';
import { ApolloLink } from 'apollo-link';

const uri = `${environment.serverUrl}/graphql`; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink) {
  const http = httpLink.create({ uri });

  /* const auth = setContext(_ => {
    return {headers: {Authorization: "1234"} }
  }); */
  const middleware = new ApolloLink((operation, forward) => {

    // Check for token
    const token = localStorage.getItem('uitoken');
    if (!token) return forward(operation);

    operation.setContext({
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${token}`,
      ),
    });
    return forward(operation);
  });
  const link = middleware.concat(http);
  return {
    link: link,
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
      deps: [HttpLink],
    },
  ],
})

 export class GraphQLModule {}
