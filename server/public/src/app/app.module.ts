import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
//import { HttpModule } from '@angular/http';

import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { LoginComponent } from './component/login/login.component';
import{LoginserviceService} from './component/login/loginservice.service';
import { DashboardComponent } from './component/dashboard/dashboard.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './common/token.interceptor';
import { AuthGuard } from './common/_guards/index';
import { HeaderComponent } from './common/header/header.component';
import{HeaderService} from './common/header/header.service';
import { FooterComponent } from './common/footer/footer.component';
import{FooterService} from './common/footer/footer.service';
import { LeftSidebarComponent } from './common/left-sidebar/left-sidebar.component';
import{LeftSidebarService} from './common/left-sidebar/left-sidebar.service';
import { AlertComponent } from './common/alert/alert.component';
import { AlertService } from './common/alert/alert.service';
 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    LeftSidebarComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [LoginserviceService, AuthGuard, HeaderService, FooterService, LeftSidebarService, AlertService, CookieService,{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
