import { EmployeeGQLService } from './../services/employee-gql.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss']
})
export class EmployeeInfoComponent implements OnInit {
  employee: Employee;
  constructor(private activatedRoute: ActivatedRoute, private epmloyeeGQLService: EmployeeGQLService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if(params.employeeId) {
        // get user info by id
        // autofill the form
        this.epmloyeeGQLService
          .getEmployeeById(params.employeeId)
          .subscribe( ({data, loading}) => {
            const {employee} = data;
            this.employee = employee;
          });
      }
    })
  }

}
