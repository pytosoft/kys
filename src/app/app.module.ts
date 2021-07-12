import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { HttpService } from './core/http/interceptor/http-service.service';
import { LoaderService } from './core/services/loader/loader.service';
import { LoginService } from './core/services/login/login.service';
import { SharedService } from './core/services/shared/shared.service';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [LoaderService, LoginService, SharedService,
    ConfirmationService,
    {
      provide: HttpClient,
      useClass: HttpService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
