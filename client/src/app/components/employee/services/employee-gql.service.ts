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
}
