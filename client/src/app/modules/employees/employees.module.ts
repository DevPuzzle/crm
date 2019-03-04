import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './components/employee-layout/employee.component';
import { EmployeeInfoComponent } from './components/employee-info/employee-info.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeInfoComponent,
    EmployeeListComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ]
})
export class EmployeesModule { }
