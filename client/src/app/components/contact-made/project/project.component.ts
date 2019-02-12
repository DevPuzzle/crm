import { Component, OnInit } from '@angular/core';
import { Time } from 'src/app/shared/interfaces';
import { ContactMadeGQLService } from '../services/contact-made-qql.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FormControl} from '@angular/forms';




@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  time: Time[] = [];
  projectForm: FormGroup;
  stateCtrl = new FormControl();
  onOff = true;
  dataForSelect;
  requiredFieldError = 'This is a required field';

  constructor(
    private fb: FormBuilder,
    private contactMadeGQLService: ContactMadeGQLService
  ) { }

  ngOnInit() {
    this.initProjectForm();
    this.initTime();
    this.contactMadeGQLService
      .getDataForSelect()
      .subscribe( ({data, loading}) => {
        this.dataForSelect = data;
      });
  }

  onSave() {
    console.log('1_on save form', this.projectForm.value);
    delete this.projectForm.value['enable'];
    this.contactMadeGQLService.createProject(this.projectForm.value);
  }

  onChangeNotification(enable: boolean) {
    // const field = this.projectForm.get('type');
    if (enable) {
      this.onOff = false;
      this.projectForm.get('type').enable();
      this.projectForm.get('comment').enable();
      this.projectForm.get('date').enable();
      this.projectForm.get('time').enable();
    } else {
      this.onOff = true;
      this.projectForm.get('type').disable();
      this.projectForm.get('comment').disable();
      this.projectForm.get('date').disable();
      this.projectForm.get('time').disable();
    }
  }

  initProjectForm() {
    this.projectForm = this.fb.group({
      'enable': false,
      'client': [''],
      'employee': [''],
      'platform': [''],
      'title': ['', Validators.required],
      'link': [''],
      'info': [''],
      'status': [''],
      'type': [{
        value: null,
        disabled: true,
      }, [Validators.required]],
      'comment': [{
        value: null,
        disabled: true,
      }],
      'date': [{
        value: null,
        disabled: true,
      }, [Validators.required]],
      'time': [{
        value: null,
        disabled: true,
      }, [Validators.required]],
    });
  }

  initTime() {
    for (let i = 0; i < 24; i++) {
      this.time.push({value: i.toString(), viewValue: i.toString() + ':00'});
    }
  }

}
