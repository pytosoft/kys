import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload/upload.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: UploadComponent },
];

@NgModule({
  declarations: [
    UploadComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UploadModule { }
