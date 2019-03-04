import { Component, OnInit } from '@angular/core';
import { CoverLetter } from 'src/app/shared/interfaces';
import { CoverLetterGQLService } from '../services/cover-letters-gql.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-letter-list',
  templateUrl: './letter-list.component.html',
  styleUrls: ['./letter-list.component.scss']
})
export class LetterListComponent implements OnInit {
  coverLetters: CoverLetter[];
  constructor(private coverLetterGQLService: CoverLetterGQLService, private router: Router) { }

  ngOnInit() {
    this.coverLetterGQLService
      .getCoverLetters()
      .subscribe( ({data, loading}) => {
        const {coverLetters} = data;
        this.coverLetters = coverLetters;
        // console.log('this.coverLetters', this.coverLetters);
      });
  }
}
