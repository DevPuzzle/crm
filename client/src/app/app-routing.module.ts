import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { AuthComponent } from './components/auth/auth/auth.component';
import { EmployeeComponent } from './components/employee/employee.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: EmployeeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
