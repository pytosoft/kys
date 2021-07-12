import { ConfirmComponent } from './confirm/confirm.component';
import { PlanComponent } from './plan/plan.component';
import { PersonalComponent } from './personal/personal.component';
import { UserTypeComponent } from './user-type/user-type.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionComponent } from './subscription.component';

const routes: Routes = [
  { path: '', component: SubscriptionComponent,
children: [
  { path: 'user', component: UserTypeComponent },
  { path: 'personal', component: PersonalComponent },
  { path: 'plan', component: PlanComponent },
  { path: 'confirm', component: ConfirmComponent }
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionRoutingModule { }
