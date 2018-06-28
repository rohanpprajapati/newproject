import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import{AuthComponent} from './auth/auth.component';

import{UserComponent} from './user/user.component';
import{AboutComponent} from './about/about.component';


@NgModule({
    imports: [
    RouterModule.forRoot([
         { path: 'user', component: UserComponent },
         { path: 'about', component: AboutComponent },
		 { path: 'auth', component: AuthComponent }

    ],{preloadingStrategy:PreloadAllModules})
  ],
  exports:[RouterModule]
 })
export class AppRoutingModule {}
