import { Component, OnInit } from '@angular/core';
import{LeftSidebarService} from './left-sidebar.service';

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

}
