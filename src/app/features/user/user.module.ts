import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SharedModule } from './../../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import {DropdownModule} from 'primeng/dropdown'

@NgModule({
  declarations: [
    UserComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    DropdownModule
    
  ]
})
export class UserModule { }
