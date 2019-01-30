import { EmployeeGQLService } from './../services/employee-gql.service';
import { UserGQLService } from '../../services/user-qql.service';
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
  EmployeeId;
  employeeForm: FormGroup;
  company;
  user;
  requiredFieldError = 'This is a required field';
  constructor(
    private activatedRoute: ActivatedRoute, private epmloyeeGQLService: EmployeeGQLService,
    private userGQLService: UserGQLService, private fb: FormBuilder) { }

  ngOnInit() {
    this.userGQLService.getAuthorizeUser().subscribe(({data}) => {
      this.user = data.getAuthorizedUser;
  });
    this.initEmployeeForm();
    this.activatedRoute.params.subscribe(params => {
      if (params.employeeId) {
        this.epmloyeeGQLService
          .getEmployeeById(params.employeeId)
          .subscribe( ({data, loading}) => {
            const {employee} = data;
            this.EmployeeId = employee._id;
            this.company = employee.company.name;
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
    if (this.EmployeeId) {
      delete this.employeeForm.value['company'];
      this.epmloyeeGQLService.updateEmployee(this.employeeForm.value, this.EmployeeId);
    } else {
      delete this.employeeForm.value['company'];
      this.epmloyeeGQLService.createEmployee(this.employeeForm.value);
    }
  }
}
