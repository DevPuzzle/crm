import { GET_EMPLOYEE_BY_ID } from './../../../shared/gqlQueries/employees.queries';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Employee } from 'src/app/shared/interfaces';
import * as employeesQueries from 'src/app/shared/gqlQueries/employees.queries';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGQLService {

  constructor(private apollo: Apollo) { }

  getAllEmployees() {
    return this.apollo.watchQuery<{employees: Employee[]}>({
      query: employeesQueries.GET_EMPLOYEES_LIST
    })
    .valueChanges;
  }

  getEmployeeById(id: string) {
    console.log(id);
    return this.apollo.watchQuery<{employee: Employee}>({
      query: employeesQueries.GET_EMPLOYEE_BY_ID,
      variables: {
        id: id
      }
    })
    .valueChanges;
  }
}
