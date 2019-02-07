import { Component, OnInit } from '@angular/core';
import { Hour } from 'src/app/shared/interfaces';
import { Minute } from 'src/app/shared/interfaces';
import { StaticData } from 'src/app/shared/interfaces';
import { ContactMadeGQLService } from '../services/contact-made-qql.service';



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  hours: Hour[] = [];
  minutes: Minute[] = [];
  staticData: StaticData[];

  constructor(
    private contactMadeGQLService: ContactMadeGQLService
  ) { }

  ngOnInit() {
    this.initTime();
    console.log('INIT!!!!!!!!!!');
    this.contactMadeGQLService
      .getDataForSelect()
      .subscribe( ({data, loading}) => {
        console.log('DATA FROM PROJECT INIT', data);
      });
  }

  initTime() {
    for (let i = 0; i < 24; i++) {
      this.hours.push({value: i.toString(), viewValue: i.toString()});
    }

    for (let j = 0; j < 60; j += 10) {
    this.minutes.push({value: j.toString(), viewValue: j.toString()});
    }

  }

}
