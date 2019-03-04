import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { text } from '@angular/core/src/render3';

@Component({
  selector: 'app-letter-info',
  templateUrl: './letter-info.component.html',
  styleUrls: ['./letter-info.component.scss']
})
export class LetterInfoComponent implements OnInit {
  public coverLetterForm: FormGroup;
  private letterCount = 1;


  constructor(
    private formBuilder: FormBuilder
  ) {
    this.coverLetterForm = formBuilder.group({
      title: ['TITLE TEST', Validators.required],
      letters: new FormArray([
       new FormGroup({
         text: new FormControl('')
       })
      ]),
      _id: ''
    });

  }

  ngOnInit() {
  }

  addLetterField() {
    (this.coverLetterForm.get('letters') as FormArray).push(
      this.formBuilder.group(
        { text: this.formBuilder.control([''], [Validators.required]) }
      )
    );
    this.letterCount++;
    // console.log('this.coverLetterForm', this.coverLetterForm.controls.letters);

   // this.coverLetterForm.addControl('letter' + this.letterCount, new FormControl('', Validators.required));
    // console.log()
    // this.letterCount++;
    // this.coverLetterForm.addControl('letter' + this.letterCount, new FormControl('', Validators.required));
    // console.log('this.coverLetterForm', this.coverLetterForm.value);
  }

  removeLetterField(letter) {
    console.log('letter', letter);
    (this.coverLetterForm.get('letters') as FormArray).removeAt(letter[0]);
  }
}
