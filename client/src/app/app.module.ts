import { AngularMaterialModule } from './angular-material/angular-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraphQLModule } from './graphql/graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthModule } from './components/main/auth.module';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { HeaderComponent } from './components/header/header.component';
import { CoverLettersComponent } from './components/cover-letters/cover-letters.component';
import { ContactMadeComponent } from './components/contact-made/contact-made.component';
import { ClientsComponent } from './components/clients/clients.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { EmployeeInfoComponent } from './components/employee/employee-info/employee-info.component';
import { ClientInfoComponent } from './components/clients/client-info/client-info.component';
import { ClientListComponent } from './components/clients/client-list/client-list.component';
import { AuthGQLService } from './components/main/services/auth-gql.service';
import { ProjectComponent } from './components/contact-made/project/project.component';
import { MatNativeDateModule, NativeDateModule, MatDatepickerModule } from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';



@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    EmployeeComponent,
    EmployeeListComponent,
    EmployeeInfoComponent,
    ClientsComponent,
    ClientInfoComponent,
    ClientListComponent,
    HeaderComponent,
    CoverLettersComponent,
    ContactMadeComponent,
    PageNotFoundComponent,
    ProjectComponent
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
    AuthModule,
    MatNativeDateModule,
    NativeDateModule,
    MatDatepickerModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  bootstrap: [AppComponent]
})
/* TODO: check if it can be refactored and put to graphql module not in app module */
export class AppModule {
  constructor(private adapter: DateAdapter<any>) {}
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
