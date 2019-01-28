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
  isEditing: boolean;
  employeeForm: FormGroup;
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
            this.isEditing = true;
            this.fillInForm(employee);
          });
      }
    });
  }

  initEmployeeForm() {
    this.employeeForm = this.fb.group({
      'name': ['', [Validators.required] ],
      'last_name': ['', [Validators.required] ],
      'email': ['', [Validators.required, Validators.email] ],
      'skills': ['', [] ]
    });
  }

  fillInForm(employee) {
    for (const key in employee) {
      if ( employee.hasOwnProperty( key ) ) {
        this.employeeForm.patchValue({
          [key]: employee[key]
        });
      }
    }
  }

  onSave() {
    console.log('onSave Work');
    console.log(this.employeeForm.value);
    // this.epmloyeeGQLService.createEmployee(this.employeeForm.value);
    if (this.isEditing) {
      // request to update user
    } else {
      // request to create user
    }
  }
}
