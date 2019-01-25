import { EmployeeGQLService } from './../services/employee-gql.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/shared/interfaces';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss']
})
export class EmployeeInfoComponent implements OnInit {
  employee: Employee;
  employeeForm: FormGroup;
  requiredFieldError = 'This is a required field';
  constructor(private activatedRoute: ActivatedRoute, private epmloyeeGQLService: EmployeeGQLService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initEmployeeForm();
    this.activatedRoute.params.subscribe(params => {
      if (params.employeeId) {
        // get user info by id
        // autofill the form
        this.epmloyeeGQLService
          .getEmployeeById(params.employeeId)
          .subscribe( ({data, loading}) => {
            const {employee} = data;
            this.employee = employee;
            this.initEmployeeForm(employee);
          });
      }
    });
  }

  initEmployeeForm(employee?) {
    let employeeName = '';
    let employeeLastname = '';
    let employeeEmail = '';
    let employeeSkills = '';

    if (employee) {
      employeeName = employee.name;
      employeeLastname = employee.last_name;
      employeeEmail = employee.email;
      employeeSkills = employee.skills;
    }
    this.employeeForm = this.fb.group({
      'name': [employeeName, [Validators.required] ],
      'last_name': [employeeLastname, [Validators.required] ],
      'email': [employeeEmail, [Validators.required, Validators.email] ],
      'skills': [employeeSkills, [] ]
    });
  }
}
