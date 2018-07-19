import { Component, OnInit, OnDestroy } from '@angular/core';
import{LoginserviceService} from './loginservice.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';

import{HeaderService} from '../../common/header/header.service';
import{FooterService} from '../../common/footer/footer.service';
import{LeftSidebarService} from '../../common/left-sidebar/left-sidebar.service';
import { AlertService } from '../../common/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginAccess:any={};
  
  constructor(
  		private loginService:LoginserviceService,
		private cookieService:CookieService,
		private route: ActivatedRoute,
        private router: Router,
		public header: HeaderService,
	    public footer: FooterService,
	    public leftSide: LeftSidebarService,
		private alertService: AlertService) {
			
			// Header Show
			this.header.hide();
			// Footer Show
			this.footer.hide();
			// LeftSide Show
			this.leftSide.hide();
			
			// Login to dashboard
			if (localStorage.getItem('currentUser')) {
			  	router.navigate(['dashboard']);
			}
			
				
  		}

  // Init on load time
  ngOnInit() {
  		// Add Class in Body
		const body = document.getElementsByTagName('body')[0];
    	body.classList.add('login-page');
		
		// Get Basic Token
  		this.loginService.basicToken().subscribe(
                data => {  
					this.cookieService.set( 'Basic', data.data );
				},
				error =>  {
					console.log(error)
				}
		);
  }
  
  // Init on Change module time
  ngOnDestroy() {
    // Remove Class from Body
	const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
  }
  
  loginProcess(evnt:any)
  {
  	this.loginService.checkLoginCredentials(this.loginAccess).subscribe(
                data => {  
					this.cookieService.set( 'Bearer', data.access_token );
					this.cookieService.set( 'Refresh', data.refresh_token );
					this.router.navigate(['dashboard']);
		        },
				error =>  {
					var errorRes = error.error;
					if(errorRes.message == '' || typeof errorRes.message === 'undefined' || typeof errorRes.message === 'object')
                    {
						this.alertService.error('Login process not completed');
                    }
                    else
                    {
						this.alertService.error(errorRes.message);
                    }
				}
	);
  }

}
