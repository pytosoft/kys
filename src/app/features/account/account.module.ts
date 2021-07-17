import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';

const routes: Routes = [{ path: '', component: AccountComponent }];

export class DashboardRoutingModule { }

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountModule { }
