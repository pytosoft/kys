import { RouterModule } from '@angular/router';
import { ApiHeaderInterceptor } from './../core/http/interceptor/api-header.interceptor';
import { ErrorHandlerInterceptor } from './../core/http/interceptor/error-handler.interceptor';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { ApiPrefixInterceptor } from '../core/http/interceptor/api-prefix.interceptor';
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
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    UiFeaturesModule
  ],
  providers: [
    ApiHeaderInterceptor, ApiPrefixInterceptor,
    ErrorHandlerInterceptor
  ]
})
export class SharedModule { }
