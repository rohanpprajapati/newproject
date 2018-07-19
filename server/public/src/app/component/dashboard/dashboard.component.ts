import { Component, OnInit, OnDestroy } from '@angular/core';
import{HeaderService} from '../../common/header/header.service';
import{FooterService} from '../../common/footer/footer.service';
import{LeftSidebarService} from '../../common/left-sidebar/left-sidebar.service';

import { AlertService } from '../../common/alert/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public now: Date = new Date();
  public dashboardData:any={};
 	
  constructor(
	  public header: HeaderService,
	  public footer: FooterService,
	  public leftSide: LeftSidebarService,
	  private alertService: AlertService) {
	  
	  	this.getBidData();	
		const this1 = this;
		setInterval(() => { 
			this1.getBidData();
		 }, 2000 );

	  }
	   
  public getBidData()
  {
  	var match_1_1 = ['14', '12.5', '13.1', '14.2']
	this.dashboardData.match_1_1_value = match_1_1[Math.floor(Math.random() * match_1_1.length)];
	
	var match_1_2 = ['5', '5.1', '4.01', '3.9']
	this.dashboardData.match_1_2_value = match_1_2[Math.floor(Math.random() * match_1_2.length)];
	
	var match_1_3 = ['7', '7.8', '6.9', '6.5']
	this.dashboardData.match_1_3_value = match_1_3[Math.floor(Math.random() * match_1_3.length)];
	
	// Second Match
	var match_2_1 = ['10', '10.2', '9.9', '9.5']
	this.dashboardData.match_2_1_value = match_2_1[Math.floor(Math.random() * match_2_1.length)];
	
	var match_2_2 = ['4', '4.2', '3.09', '3.5']
	this.dashboardData.match_2_2_value = match_2_2[Math.floor(Math.random() * match_2_2.length)];
	
	var match_2_3 = ['6', '6.5', '7', '6.9']
	this.dashboardData.match_2_3_value = match_2_3[Math.floor(Math.random() * match_2_3.length)];
	
	// Third Match
	var match_3_1 = ['7', '6.1', '6.8', '7.1']
	this.dashboardData.match_3_1_value = match_3_1[Math.floor(Math.random() * match_3_1.length)];
	
	var match_3_2 = ['2', '2.1', '2.5', '2.9']
	this.dashboardData.match_3_2_value = match_3_2[Math.floor(Math.random() * match_3_2.length)];
	
	var match_3_3 = ['9', '8.7', '8.9', '9.1']
	this.dashboardData.match_3_3_value = match_3_3[Math.floor(Math.random() * match_3_3.length)];
	
	// Forth Match
	var match_4_1 = ['12', '11.7', '12.2', '12.3']
	this.dashboardData.match_4_1_value = match_4_1[Math.floor(Math.random() * match_4_1.length)];
	
	var match_4_2 = ['2', '2.1', '2.5', '1.9']
	this.dashboardData.match_4_2_value = match_4_2[Math.floor(Math.random() * match_4_2.length)];
	
	var match_4_3 = ['8', '8.2', '7.9', '7.8']
	this.dashboardData.match_4_3_value = match_4_3[Math.floor(Math.random() * match_4_3.length)];
	
	
	
  }	  

  ngOnInit() {
  		// Add Class in Body
		const body = document.getElementsByTagName('body')[0];
    	body.classList.add('skin-blue');
		body.classList.add('sidebar-mini');
		body.classList.add('hold-transition');
		
		// Header Show
		this.header.show();
		// Footer Show
		this.footer.show();
		// LeftSide Show
		this.leftSide.show();
		
		
		
  }
  
  // Init on Change module time
  ngOnDestroy() {
    // Remove Class from Body
	const body = document.getElementsByTagName('body')[0];
    body.classList.remove('skin-blue');
	body.classList.remove('sidebar-mini');
	body.classList.remove('hold-transition');
	
  }

}
