import { Component, OnInit } from '@angular/core';

export interface Hour {
  value: string;
  viewValue: string;
}

export interface Minute {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  hours: Hour[] = [];
  minutes: Minute[] = [];

  constructor() { }

  ngOnInit() {
    this.initTime();

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
