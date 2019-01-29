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
  EditUserId;
  employeeForm: FormGroup;
  company;
  requiredFieldError = 'This is a required field';
  constructor(private activatedRoute: ActivatedRoute, private epmloyeeGQLService: EmployeeGQLService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initEmployeeForm();
    this.activatedRoute.params.subscribe(params => {
      if (params.employeeId) {
        this.epmloyeeGQLService
          .getEmployeeById(params.employeeId)
          .subscribe( ({data, loading}) => {
            const {employee} = data;
            // console.log(employee._id);
            this.EditUserId = employee._id;
            this.company = employee.company.name;
            console.log('this.company', this.company);
            this.fillInForm(employee);
          });
      }
    });
  }

  initEmployeeForm() {
    this.employeeForm = this.fb.group({
      'company': [''],
      'name': ['', [Validators.required] ],
      'last_name': ['', [Validators.required] ],
      'email': ['', [Validators.required, Validators.email] ],
      'skills': ['', [] ]
    });
  }

  fillInForm(employee) {
    // console.log(employee.company.name);
    for (const key in employee) {
      if ( employee.hasOwnProperty( key ) ) {
        if (key === 'company') {
          this.employeeForm.patchValue({
            [key]: employee[key].name
          });
        } else {
          this.employeeForm.patchValue({
            [key]: employee[key]
          });
        }
      }
    }
  }

  onSave() {
    console.log('onSave');
    console.log(this.employeeForm.value);
    delete this.employeeForm.value['company'];
    this.epmloyeeGQLService.createEmployee(this.employeeForm.value);
    if (this.EditUserId) {
      console.log('UPDATE USER');
    } else {
      console.log('CREATE USER');
    }
  }
}
