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
  		console.log('test')
  		/* Get Basic Token */
  		this.authService.basicToken().subscribe(
                data => {  
					console.log(data.data);
					this.cookieService.set( 'Basic', data.data );
				},
				error =>  {
					console.log(error)
				}
		);
  }
  
  /* Login Process */
  loginProcess()
  {
   	this.authService.checkLoginCredentials(this.loginAccess).subscribe(
                data => {  
					console.log('success');
					console.log(data);
					alert('Success');
		        },
				error =>  {
					console.log('error')
					console.log(error.error)
					var errorRes = error.error;
					alert(errorRes.message)
				}
	);
  }

}
