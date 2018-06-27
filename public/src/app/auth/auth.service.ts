import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {

	/* Get Basic Token */
	basicToken()
	{
		return this.http.get("http://localhost:3072/api/v1.1/auth/basic-token")
	        .map(this.extractData)
	        .catch(this.handleError);
	}

	/* Check Login API */
	checkLoginCredentials(access){
		access = JSON.stringify(access);
		
		
		
		let headers = new Headers({ "Content-Type": "application/json" });
    	//let options = new RequestOptions({ headers: headers })
			

		return this.http.post("http://localhost:3072/api/v1.1/auth/login", access, {
		  headers: headers
		})
	        .map(this.extractData)
	        .catch(this.handleError);
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
