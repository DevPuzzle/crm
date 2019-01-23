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
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { HeaderComponent } from './components/header/header.component';
import { CoverLettersComponent } from './components/cover-letters/cover-letters.component';
import { ContactMadeComponent } from './components/contact-made/contact-made.component';
import { ClientsComponent } from './components/clients/clients.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { EmployeeInfoComponent } from './components/employee/employee-info/employee-info.component';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    EmployeeComponent,
    HeaderComponent,
    CoverLettersComponent,
    ContactMadeComponent,
    ClientsComponent,
    EmployeeListComponent,
    EmployeeInfoComponent
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
  /* constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    const http = httpLink.create({ uri: '/graphql' });

  //   const authMiddleware = new ApolloLink((operation, forward) => {
  //     // add the authorization to the headers
  //     // we assume `headers` as a defined instance of HttpHeaders
  //     operation.setContext(({ headers }) => ({
  //       headers: headers.append('Authorization', localStorage.getItem('token') || null),
  //     }));

  //     return forward(operation);
  //   });

    apollo.create({
      cache: new InMemoryCache(),
      link: from([authMiddleware, http]),
    });
  } */
}
