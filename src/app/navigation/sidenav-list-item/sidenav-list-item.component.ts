import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-list-item',
  templateUrl: './sidenav-list-item.component.html',
  styleUrls: ['./sidenav-list-item.component.css']
})
export class SidenavListItemComponent implements OnInit {

  @Output() closeSidenav = new EventEmitter<void>()

  constructor() { }

  ngOnInit() {
  }

  onClose(){
    this.closeSidenav.emit();
  }
}
