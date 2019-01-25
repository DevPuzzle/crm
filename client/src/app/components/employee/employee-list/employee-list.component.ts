import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/interfaces';
import { Router } from '@angular/router';
import { EmployeeGQLService } from '../services/employee-gql.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})

export class EmployeeListComponent implements OnInit {
  employees: Employee[];

  constructor(private employeeGQLService: EmployeeGQLService, private router: Router) { }

  ngOnInit() {
    this.employeeGQLService
      .getAllEmployees()
      .subscribe( ({data, loading}) => {
        const {employees} = data;
        this.employees = employees;
      });
  }

  onAddEmployee() {
    console.log('add employee');
    this.router.navigate(['new']);
  }
}
