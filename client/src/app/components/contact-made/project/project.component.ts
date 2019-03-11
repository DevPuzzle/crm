import { Component, OnInit } from '@angular/core';
import { Time } from 'src/app/shared/interfaces';
import { ContactMadeGQLService } from '../services/contact-made-qql.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FormControl} from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from '@angular/core';
import { DialogService } from 'src/app/shared/dialog.service';




@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  time: Time[] = [];
  projectForm: FormGroup;
  stateCtrl = new FormControl();
  onOff = false;
  dataForSelect;
  requiredFieldError = 'This is a required field';

  constructor(
    private fb: FormBuilder,
    private contactMadeGQLService: ContactMadeGQLService,
    @Inject(MAT_DIALOG_DATA) public dataProject: any,
    public dialogRef: MatDialogRef<ProjectComponent>,
    private dialogService: DialogService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.initProjectForm();
    if (this.dataProject) {
      // console.log('редактировка');
      this.fillInForm(this.dataProject);
      this.onChangeNotification(this.onOff);
      // console.log('заполненная форма', this.projectForm.value);
    } else {
      // console.log('создание');
    }
    this.initTime();
    this.contactMadeGQLService
      .getDataForSelect()
      .subscribe( ({data, loading}) => {
        this.dataForSelect = data;
      });
  }

  onSave() {
    delete this.projectForm.value['enable'];
    if (this.dataProject) {
      this.contactMadeGQLService.updateProject(this.projectForm.value, this.dataProject._id);
    } else {
      this.contactMadeGQLService.createProject(this.projectForm.value);
    }
    this.onClose();
  }

  onClose() {
    this.projectForm.reset();
    this.dialogRef.close();
  }

  onDelete() {
    this.dialogService.openConfirmDialog('Are you sure to delete this project?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.contactMadeGQLService.deleteProject(this.dataProject._id);
        this.onClose();
      }
    });
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
      'enable': this.onOff,
      'client': [null],
      'employee': [null],
      'platform': [null, Validators.required],
      'title': ['', Validators.required],
      'link': [''],
      'info': [''],
      'status': [null],
      'type': [{
        value: null,
        disabled: true,
      }, Validators.required],
      'comment': [{
        value: null,
        disabled: true,
      }],
      'date': [{
        value: null,
        disabled: true,
      }, Validators.required],
      'time': [{
        value: null,
        disabled: true,
      }, Validators.required],
    });
  }

fillInForm(dataProject) {
  if (this.dataProject.notification) {
    this.onOff = true;
    this.projectForm.patchValue({
      type: dataProject.notification.type._id,
      comment: dataProject.notification.comment,
      date: dataProject.notification.date,
      time: dataProject.notification.time
    });
  } else {
    this.onOff = false;
  }

  if (dataProject.client._id !== undefined) {
    this.projectForm.patchValue({client: dataProject.client._id});
  }
  if (dataProject.employee._id !== undefined) {
    this.projectForm.patchValue({employee: dataProject.employee._id});
  }
  if (dataProject.status._id !== undefined) {
    this.projectForm.patchValue({status: dataProject.status._id});
  }

  this.projectForm.patchValue({
    platform: dataProject.platform._id,
    title: dataProject.title,
    link: dataProject.link,
    info: dataProject.info,
    enable: this.onOff
  });
}

  initTime() {
    for (let i = 0; i < 24; i++) {
      this.time.push({value: i.toString(), viewValue: i.toString() + ':00'});
    }
  }

}
