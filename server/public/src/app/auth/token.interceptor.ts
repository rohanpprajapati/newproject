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
  constructor(private cookieService: CookieService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
	//console.log('http111');
	if(request.url == '/api/v1.1/auth/login')
	{
		request = request.clone({
		  setHeaders: {
			'Authorization': 'Basic '+this.cookieService.get('Basic'),
			'Content-Type': 'application/json'
		  }
		});
	}
	else if(request.url != '/api/v1.1/auth/basic-token')
	{
		request = request.clone({
		  setHeaders: {
			'Authorization': 'Bearer test',
			'Content-Type': 'application/json'
		  }
		});
	}
	//console.log(request);
    return next.handle(request);
  }
}