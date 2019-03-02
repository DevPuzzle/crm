import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './components/clients-layout/clients.component';
import { ClientInfoComponent } from './components/client-info/client-info.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    ClientsComponent,
    ClientInfoComponent,
    ClientListComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ]
})
export class ClientsModule { }
