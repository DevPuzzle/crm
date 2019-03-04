import { AngularMaterialModule } from './angular-material/angular-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraphQLModule } from './graphql/graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthModule } from './components/main/auth.module';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { CoverLettersComponent } from './components/cover-letters/cover-letters.component';
import { ContactMadeComponent } from './components/contact-made/contact-made.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProjectComponent } from './components/contact-made/project/project.component';
import { MatNativeDateModule, NativeDateModule, MatDatepickerModule } from '@angular/material';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import { ProjectTableComponent } from './components/contact-made/project-table/project-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatConfirmDialogComponent } from './components/mat-confirm-dialog/mat-confirm-dialog.component';
import { CoverLettersModule } from './components/cover-letters/cover-letters.module';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HeaderComponent,
    ContactMadeComponent,
    PageNotFoundComponent,
    ProjectComponent,
    ProjectTableComponent,
    MatConfirmDialogComponent,
    // CarouselHolderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    BrowserAnimationsModule,
    CoverLettersModule
    // CarouselModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  bootstrap: [AppComponent],
  entryComponents: [ProjectComponent, MatConfirmDialogComponent]
})
/* TODO: check if it can be refactored and put to graphql module not in app module */
export class AppModule {
  constructor(private adapter: DateAdapter<any>) {}
}
