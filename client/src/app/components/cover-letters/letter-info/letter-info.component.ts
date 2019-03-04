import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { text } from '@angular/core/src/render3';
import { ActivatedRoute, Router } from '@angular/router';
import { CoverLetterGQLService } from '../services/cover-letters-gql.service';
import { UserGQLService } from '../../services/user-qql.service';
import { DialogService } from 'src/app/shared/dialog.service';

@Component({
  selector: 'app-letter-info',
  templateUrl: './letter-info.component.html',
  styleUrls: ['./letter-info.component.scss']
})
export class LetterInfoComponent implements OnInit {
  coverLetterId;
  public coverLetterForm: FormGroup;
  private letterCount = 1;
  requiredFieldError = 'This is a required field';


  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private coverLetterGQLService: CoverLetterGQLService,
    private userGQLService: UserGQLService,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.initCoverLetterForm();
    this.activatedRoute.params.subscribe(params => {
      if (params.coverLetterId) {
        this.coverLetterGQLService
          .getCoverLetterById(params.coverLetterId).
          subscribe( ({data, loading}) => {
            const {coverLetter} = data;
            this.coverLetterId = coverLetter._id;
            this.fillInForm(coverLetter);
          });
      }
    });
  }

  onSave() {
    if (this.coverLetterForm.value._id) {
      this.coverLetterGQLService.updateCoverLetter(this.coverLetterForm.value, this.coverLetterForm.value._id);
    } else {
      delete this.coverLetterForm.value['_id'];
      this.coverLetterGQLService.createCoverLetter(this.coverLetterForm.value);
     this.router.navigate(['/letters']);
    }
    // if (this.coverLetterId) {
    //   this.clientGQLService.updateClient(this.clientForm.value, this.ClientId);
    // } else {
    //   this.clientGQLService.createClient(this.clientForm.value);
    //   this.router.navigate(['/clients']);
    // }
  }

  addLetterField() {
    (this.coverLetterForm.get('letters') as FormArray).push(
      this.formBuilder.group(
        { 'text': ['', Validators.required] }
      )
    );
  }

  removeLetterField(letter) {
    (this.coverLetterForm.get('letters') as FormArray).removeAt(letter[0]);
  }

  initCoverLetterForm() {
    this.coverLetterForm = this.formBuilder.group({
      title: ['', Validators.required],
      letters: new FormArray([
       new FormGroup({
         text: new FormControl('')
       })
      ]),
      _id: ''
    });
  }

  fillInForm(coverLetter) {
    for (const key in coverLetter) {
      if ( coverLetter.hasOwnProperty( key ) ) {
        if (key === 'letters') {
          // (this.coverLetterForm.get('letters') as FormArray);
          const formArray = (this.coverLetterForm.get('letters') as FormArray);
          while (formArray.length) {
            formArray.removeAt(formArray.length - 1);
          }
          for ( const letter of coverLetter.letters) {
          (this.coverLetterForm.get('letters') as FormArray).push(
            this.formBuilder.group(
              { 'text': [letter.text, Validators.required],
                '_id': letter._id
              }
            )
          );
        }
      }
        this.coverLetterForm.patchValue({
          [key]: coverLetter[key]
        });
      }
    }
  }
}
