import { AngularMaterialModule } from './angular-material/angular-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraphQLModule } from './graphql/graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthModule } from './components/auth/auth.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { ApolloLink, from } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GraphQLModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    /* custom modules */
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
/* TODO: check if it can be refactored and put to graphql module not in app module */
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    const http = httpLink.create({ uri: '/graphql' });

    const authMiddleware = new ApolloLink((operation, forward) => {
      // add the authorization to the headers
      // we assume `headers` as a defined instance of HttpHeaders
      operation.setContext(({ headers }) => ({
        headers: headers.append('Authorization', localStorage.getItem('token') || null),
      }));

      return forward(operation);
    });

    apollo.create({
      cache: new InMemoryCache(),
      link: from([authMiddleware, http]),
    });
  }
}
