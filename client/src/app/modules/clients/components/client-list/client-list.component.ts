import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/shared/interfaces';
import { Router } from '@angular/router';
import { ClientGQLService } from 'src/app/modules/clients/services/client-qql.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  clients: Client[];
  constructor(private clientGQLService: ClientGQLService, private router: Router) { }

  ngOnInit() {
    this.clientGQLService
      .getAllClients()
      .subscribe( ({data, loading}) => {
        const {clients} = data;
        this.clients = clients;
      });
  }

  onAddClient() {
    this.router.navigate(['new']);
  }

}
