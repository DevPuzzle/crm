import { Component, OnInit } from '@angular/core';
import { UserGQLService } from '../../../../components/services/user-qql.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  constructor(private userGQLService: UserGQLService) { }

  ngOnInit() {
      this.userGQLService.getAuthorizeUser().subscribe(({data}) => {
  });
  }

}
