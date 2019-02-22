import { GET_EMPLOYEE_BY_ID } from './../../../shared/gqlQueries/employees.queries';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Employee } from 'src/app/shared/interfaces';
import * as employeesQueries from 'src/app/shared/gqlQueries/employees.queries';
import * as contactMadeQueries from 'src/app/shared/gqlQueries/contact-made.queries';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGQLService {
  errorMessage: string;
  constructor(private apollo: Apollo) { }

  getAllEmployees() {
    return this.apollo.watchQuery<{employees: Employee[]}>({
      query: employeesQueries.GET_EMPLOYEES_LIST
    })
    .valueChanges;
  }

  getEmployeeById(id: string) {
    return this.apollo.watchQuery<{employee: Employee}>({
      query: employeesQueries.GET_EMPLOYEE_BY_ID,
      variables: {
        id: id
      }
    })
    .valueChanges;
  }

  createEmployee(employeeForm) {
    return this.apollo
      .mutate({
        refetchQueries: [{
          query: employeesQueries.GET_EMPLOYEES_LIST
        }],
        mutation: employeesQueries.CREATE_EMPLOYEE,
        variables: {
          emmployeeData: employeeForm
        },
        errorPolicy: 'all'
      })
      .pipe(
        catchError(err => {
          if (err.networkError) {
            this.errorMessage = err.networkError.error.errors[0].data;
            console.log(this.errorMessage);
          }
          return of(null);
        })
      )
      .subscribe(
        response => {
          if (response) {
          }
        }
      );
  }

  updateEmployee(employeeForm, id) {
    return this.apollo
      .mutate({
        refetchQueries: [
          { query: employeesQueries.GET_EMPLOYEE_BY_ID,  variables: {id: id} },
          { query: employeesQueries.GET_EMPLOYEES_LIST }
        ],
        mutation: employeesQueries.UPDATE_EMPLOYEE,
        variables: {
          emmployeeData: employeeForm,
          id: id
        },
        errorPolicy: 'all'
      })
      .pipe(
        catchError(err => {
          if (err.networkError) {
            this.errorMessage = err.networkError.error.errors[0].data;
            console.log(this.errorMessage);
          }
          return of(null);
        })
      )
      .subscribe(
        response => {
          if (response) {
          }
        }
      );
  }

  deleteEmployee(id) {
    return this.apollo
      .mutate({
        refetchQueries: [
          { query: employeesQueries.GET_EMPLOYEES_LIST }
        ],
        mutation: employeesQueries.DELETE_EMPLOYEE,
        variables: {
          id: id
        },
        errorPolicy: 'all'
      })
      .pipe(
        catchError(err => {
          if (err.networkError) {
            this.errorMessage = err.networkError.error.errors[0].data;
            console.log(this.errorMessage);
          }
          return of(null);
        })
      )
      .subscribe(
        response => {
          if (response) {
          }
        }
      );
  }
}
