import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private cookieService:CookieService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
	
	if(request.url != '/api/v1.1/auth/basic-token')
	{
		if(request.url == '/api/v1.1/auth/login')
		{
			request = request.clone({
			  setHeaders: {
				'Authorization': 'Basic '+this.cookieService.get( 'Basic' ),
				'Content-Type': 'application/json'
			  }
			});
		}
		else
		{
			request = request.clone({
			  setHeaders: {
				'Authorization': 'Bearer '+this.cookieService.get( 'Basic' ),
				'Content-Type': 'application/json'
			  }
			});
		}
	}
	
    return next.handle(request);
  }
}