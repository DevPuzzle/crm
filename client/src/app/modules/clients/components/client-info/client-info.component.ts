import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/shared/dialog.service';
import { ClientGQLService } from '../../services/client-qql.service';
import { UserGQLService } from 'src/app/components/services/user-qql.service';

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
  projects;
  requiredFieldError = 'This is a required field';
  panelOpenState = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientGQLService: ClientGQLService,
    private userGQLService: UserGQLService,
    private fb: FormBuilder,
    private router: Router,
    private dialogService: DialogService
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
            this.projects = data.projectsByClient;
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
      this.clientGQLService.updateClient(this.clientForm.value, this.ClientId);
    } else {
      this.clientGQLService.createClient(this.clientForm.value);
      this.router.navigate(['/clients']);
    }
  }

  onDelete() {
    this.dialogService.openConfirmDialog('Are you sure to delete this client?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.clientGQLService.deleteClient(this.ClientId);
        this.ClientId = undefined;
        this.router.navigate(['/clients']);
      }
    });
  }

  closeInfo() {
    this.router.navigate(['/clients']);
  }
}
