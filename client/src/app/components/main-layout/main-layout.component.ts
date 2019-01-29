import { Component, OnInit } from '@angular/core';
import { UserGQLService } from '../services/user-qql.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  constructor(private userGQLService: UserGQLService) { }
  ngOnInit() {
      this.userGQLService.getAuthorizeUser().subscribe(({data}) => {
        console.log('MAIN LAYOUT', data.getAuthorizedUser);
    });
  }
}
