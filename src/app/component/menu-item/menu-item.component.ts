import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  @Input() public hotel: any;

  @Output() addToMyCartEvent = new EventEmitter();

  constructor() { }

  addToMyCart = (menu: any) => {
    this.addToMyCartEvent.emit(menu);
  }

  ngOnInit(): void {
  }

}
