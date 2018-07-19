import { Component, OnInit } from '@angular/core';
import{LeftSidebarService} from './left-sidebar.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {

  constructor(
    public leftSide: LeftSidebarService) { }

  ngOnInit() {
  }
  
  toggleLeftMenu(id)
  {
  	$('.treeview-menu.'+id).slideToggle();
	$('.treeview_main.'+id).toggleClass('menu-open');
  }

}
