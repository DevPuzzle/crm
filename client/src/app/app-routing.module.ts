import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ContactMadeComponent } from './components/contact-made/contact-made.component';
import { CoverLettersComponent } from './components/cover-letters/cover-letters.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { MainComponent } from './components/main/main/main.component';
import { ClientInfoComponent } from './components/clients/client-info/client-info.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainComponent
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'letters',
        component: CoverLettersComponent
      },
      {
        path: 'contact-made',
        component: ContactMadeComponent
      },
      {
        path: 'clients',
        component: ClientsComponent,
        children: [
          {
            path: 'new',
            component: ClientInfoComponent
          },
          {
            path: 'edit/:clientId',
            component: ClientInfoComponent
          }
        ]
      },
      {
        path: 'employees',
        loadChildren: './modules/employees/employees.module#EmployeesModule'
      },
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
