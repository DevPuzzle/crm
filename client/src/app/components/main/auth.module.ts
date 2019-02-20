import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GraphQLModule } from 'src/app/graphql/graphql.module';
import { MainComponent } from './main/main.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ParticlesModule } from 'angular-particle';
import { CarouselHolderComponent } from './main/carousel-holder/carousel-holder.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    MainComponent,
    SigninComponent,
    SignupComponent,
    CarouselHolderComponent
  ],
  imports: [
    CommonModule,
    GraphQLModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ParticlesModule,
    CarouselModule
  ],
  entryComponents: [
    SigninComponent,
    SignupComponent
  ]
})
export class AuthModule { }
