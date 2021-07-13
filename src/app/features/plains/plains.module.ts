import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlainsRoutingModule } from './plains-routing.module';
import { PlainsComponent } from './plains.component';
import { SharedModule } from './../../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PlainsComponent
  ],
  imports: [
    CommonModule,
    PlainsRoutingModule,
    SharedModule,
    FormsModule
  ]
})

export class PlainsModule { }
