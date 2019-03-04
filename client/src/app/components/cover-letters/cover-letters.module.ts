import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoverLettersRoutingModule } from './cover-letters-routing.module';
import { LetterListComponent } from './letter-list/letter-list.component';
import { LetterInfoComponent } from './letter-info/letter-info.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoverLettersComponent } from './cover-letters.component';

@NgModule({
  declarations: [
    LetterListComponent,
    LetterInfoComponent,
    CoverLettersComponent
  ],
  imports: [
    CommonModule,
    CoverLettersRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule

  ]
})
export class CoverLettersModule { }
