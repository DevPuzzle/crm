import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

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
      // title: ['', Validators.required],
      // letter1: ['', Validators.required]
      title: ['TITLE TEST', Validators.required],
      letters: new FormGroup({
        letter1: new FormControl('letter1'),
        letter2: new FormControl('letter2')
      })
    });
  }

  ngOnInit() {
  }

  addLetterField() {
    // console.log('this.coverLetterForm', this.coverLetterForm.controls.letters);

   // this.coverLetterForm.addControl('letter' + this.letterCount, new FormControl('', Validators.required));
    // console.log()
    // this.letterCount++;
    // this.coverLetterForm.addControl('letter' + this.letterCount, new FormControl('', Validators.required));
    // console.log('this.coverLetterForm', this.coverLetterForm.value);
  }

  removeLetterField(letter) {
    // console.log('letter', letter);
    // this.coverLetterForm.removeControl(letter.key);
    // console.log('this.coverLetterForm', this.coverLetterForm.value);
  }
}
