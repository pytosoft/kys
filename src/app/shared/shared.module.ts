import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiPrefixInterceptor } from '../core/http/interceptor/api-prefix.interceptor';
import { ApiHeaderInterceptor } from './../core/http/interceptor/api-header.interceptor';
import { ErrorHandlerInterceptor } from './../core/http/interceptor/error-handler.interceptor';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';
import { UiFeaturesModule } from './ui-features/ui-features.module';




@NgModule({

  declarations: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    UiFeaturesModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    UiFeaturesModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiHeaderInterceptor, ApiPrefixInterceptor,
    ErrorHandlerInterceptor
  ]
})
export class SharedModule { }
