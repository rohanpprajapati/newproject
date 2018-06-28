import { Injectable } from '@angular/core';
//import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';


import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class AuthService {

	/* Get Basic Token */
	basicToken(): Observable<any>
	{
		return this.http.get("/api/v1.1/auth/basic-token")
	        .map(res => res )
	        .catch(res => res );
	}

	/* Check Login API */
	checkLoginCredentials(access){
		access = JSON.stringify(access);
		return this.http.post("/api/v1.1/auth/login", access)
				  .map(res => res )
	}
	
	/* Response Success Data */
	private extractData(res: Response) {
		let body = res.json();
        return body;
    }
	
	/* Response Error Data */
	private handleError (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.message || error);
	}

    constructor(public http: HttpClient) {
    }

}
