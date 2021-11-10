import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { SharedModule } from '../../shared/shared.module';
import {DropdownModule} from 'primeng/dropdown';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  }
];


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  
  ]
})
export class ManageAdminModule { }
