import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Employee } from 'src/app/shared/interfaces';
import gql from 'graphql-tag';
import { Router } from '@angular/router';

export const GET_EMPLOYEES_LIST = gql`
  query getEmployees{
    employees{
      _id
      email
      name
      last_name
      skills
      company_id
    }
  }
`;

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit() {
    this.apollo.watchQuery<{employees: Employee[]}>({
      query: GET_EMPLOYEES_LIST
    })
    .valueChanges
    .subscribe( ({data, loading}, ) => {
      const {employees} = data;
      this.employees = employees;
    })
  }

  onShowEmployeeInfo(employeeId: string) {
    console.log(employeeId);
  }

  onAddEmployee() {
    console.log('add employee');
    this.router.navigate(['new']);
  }
}
