import { EmployeeInfoComponent } from './components/employee/employee-info/employee-info.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ContactMadeComponent } from './components/contact-made/contact-made.component';
import { CoverLettersComponent } from './components/cover-letters/cover-letters.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { MainComponent } from './components/main/main/main.component';
import { EmployeeComponent } from './components/employee/employee.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main'
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
        component: ClientsComponent
      },
      {
        path: 'employees',
        component: EmployeeComponent,
        children: [
          {
            path: 'new',
            component: EmployeeInfoComponent
          },
          {
            path: 'edit/:employeeId',
            component: EmployeeInfoComponent
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
