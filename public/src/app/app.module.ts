import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { CookieService } from 'ngx-cookie-service';


import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { AboutComponent } from './about/about.component';
import { NavComponent } from './nav/nav.component';
import { AuthComponent } from './auth/auth.component';


import{UserService} from './user/user.service';
import{AuthService} from './auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AboutComponent,
    NavComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [UserService, AuthService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
