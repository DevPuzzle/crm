import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './components/employee-layout/employee.component';
import { EmployeeInfoComponent } from './components/employee-info/employee-info.component';

const routes: Routes = [
  {
    path: '',
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
