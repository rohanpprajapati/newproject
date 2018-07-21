import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthGuard } from './common/_guards/index';

@NgModule({
    imports: [
    RouterModule.forRoot([
		 { path: 'login', component: LoginComponent },
		 { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
		  { path: '', component: LoginComponent },
		 
		 // otherwise redirect to home
	     { path: '**', redirectTo: '' }

    ],{preloadingStrategy:PreloadAllModules})
  ],
  exports:[RouterModule]
 })
export class AppRoutingModule {}
