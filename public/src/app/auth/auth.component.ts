import { Component, OnInit } from '@angular/core';
import{AuthService} from './auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginAccess:any={};

  constructor(private authService:AuthService, private cookieService:CookieService) { }

  ngOnInit() {
  		/* Get Basic Token */
  		this.authService.basicToken().subscribe(
                data => {  
					this.cookieService.set( 'Basic', data.data );
				},
				error =>  {
					console.log('Basic Error')
					console.log(error)
				}
		);
  }
  
  /* Login Process */
  loginProcess()
  {
  	alert('test')
  	this.authService.checkLoginCredentials(this.loginAccess).subscribe(
                data => {  
					console.log('succ');
					console.log(data);
		        },
				error =>  {
					console.log('error')
					console.log(error)
				}
	);
  }

}
