import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderService } from './header.service';
import{LoginserviceService} from '../../component/login/loginservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
	private router: Router,
  	public header: HeaderService,
	private loginService: LoginserviceService ) { }

  ngOnInit() {
  }
  
  // Logout Click
  logout()
  {
	this.loginService.logoutProcess();
	this.router.navigate(['login']);
  }

}
