import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlainsComponent } from './plains.component';

const routes: Routes = [
  {
    path: '',
    component: PlainsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlainsRoutingModule { }
