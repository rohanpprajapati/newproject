import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


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
		
		return this.http.post("http://localhost:3072/api/v1.1/auth/login", access)
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

    constructor(public http: Http) {
    }

}
