import { EmployeeGQLService } from './../services/employee-gql.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/shared/interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
          });
      }
    });
  }

  initEmployeeForm() {
    this.employeeForm = this.fb.group({
      'name': ['', [Validators.required] ],
      'last-name': ['', [Validators.required] ],
      'email': ['', [Validators.required, Validators.email] ]
    });
  }
}
