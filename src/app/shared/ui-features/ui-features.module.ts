import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MessageService } from 'primeng/api';


@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule
  ],
  providers: [
    MessageService
  ],
})
export class UiFeaturesModule { }
