import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoverLettersComponent } from './cover-letters.component';
import { LetterInfoComponent } from './letter-info/letter-info.component';

const routes: Routes = [
  {
    path: '',
    component: CoverLettersComponent,
    children: [
      {
        path: 'new',
        component: LetterInfoComponent
      },
      {
        path: 'edit/:coverLetterId',
        component: LetterInfoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoverLettersRoutingModule { }
