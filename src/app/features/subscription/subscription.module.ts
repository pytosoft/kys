import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionComponent } from './subscription.component';
import { UserTypeComponent } from './user-type/user-type.component';
import { PersonalComponent } from './personal/personal.component';
import { PlanComponent } from './plan/plan.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { SharedModule } from '../../shared/shared.module';
import { ListComponent } from './list/list/list.component';
import {DropdownModule} from 'primeng/dropdown';
import { CardModule, } from 'primeng/card';


@NgModule({
  declarations: [
    SubscriptionComponent,
    UserTypeComponent,
    PersonalComponent,
    PlanComponent,
    ConfirmComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
    FormsModule,
    SharedModule,
    DropdownModule,
    CardModule
  ]
})
export class SubscriptionModule { }
