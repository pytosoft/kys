import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { HttpService } from './core/http/interceptor/http-service.service';
import { AuthguardService } from './core/services/auth/authguard.service';
import { LoaderService } from './core/services/loader/loader.service';
import { LoginService } from './core/services/login/login.service';
import { SharedService } from './core/services/shared/shared.service';
import { SharedModule } from './shared/shared.module';
import { kysGuard } from './core/auth/kys.guard';



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
  providers: [
    {
      provide: HttpClient,
      useClass: HttpService
    },
    LoaderService, LoginService, SharedService,
    ConfirmationService, MessageService,AuthguardService,kysGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
