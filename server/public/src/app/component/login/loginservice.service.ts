import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class LoginserviceService {

   constructor(public http: HttpClient) { }

  /* Get Basic Token */
	basicToken(): Observable<any>
	{
		return this.http.get("/api/v1.1/auth/basic-token")
	        .map(res => res )
	        .catch(res => res );
	}

   /* Login API Process */
	checkLoginCredentials(access):Observable<any>
	{
		access = JSON.stringify(access);
		return this.http.post("/api/v1.1/auth/login", access)
				  .map(res => {
						if (res && res['access_token']) {
							localStorage.setItem('currentUser', JSON.stringify(res));
						}
						return res;
					})
				  .catch(res => {
					  	return Observable.throw(res);
				  });
	}	
	
	/* Logout process */
	logoutProcess()
	{
		localStorage.removeItem('currentUser');
		return true;
	}

}
