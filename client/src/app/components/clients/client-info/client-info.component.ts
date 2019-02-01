import { Component, OnInit } from '@angular/core';
import { ClientGQLService } from '../../employee/services/client-qql.service';
import { UserGQLService } from '../../services/user-qql.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent implements OnInit {
  ClientId;
  clientForm: FormGroup;
  company;
  user;
  requiredFieldError = 'This is a required field';

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientGQLService: ClientGQLService,
    private userGQLService: UserGQLService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.userGQLService.getAuthorizeUser().subscribe(({data}) => {
      this.user = data.getAuthorizedUser;
    });
    this.initClientForm();
    this.activatedRoute.params.subscribe(params => {
      if (params.clientId) {
        this.clientGQLService
          .getClientById(params.clientId).
          subscribe( ({data, loading}) => {
            const {client} = data;
            this.ClientId = client._id;
            this.company = client.company.name;
            this.fillInForm(client);
          });
      }
    });
  }

  initClientForm() {
    this.clientForm = this.fb.group({
      'name': ['', [Validators.required] ],
      'last_name': ['', [] ],
      'email': ['', [Validators.required, Validators.email] ],
      'skype': ['', [] ],
      'comment': ['', [] ]
    });
  }

  fillInForm(client) {
    for (const key in client) {
      if ( client.hasOwnProperty( key ) ) {
        if (key === 'company') {
          this.clientForm.patchValue({
            [key]: client[key].name
          });
        } else {
          this.clientForm.patchValue({
            [key]: client[key]
          });
        }
      }
    }
  }

  onSave() {
    if (this.ClientId) {
      console.log('UPDATE CLIENT');
      this.clientGQLService.updateClient(this.clientForm.value, this.ClientId);
    } else {
      console.log('CREATE CLIENT');
      this.clientGQLService.createClient(this.clientForm.value);
    }
  }
}
