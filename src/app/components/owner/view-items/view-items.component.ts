import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.css']
})
export class ViewItemsComponent implements OnInit {
  public items: any[]
  constructor() { }

  ngOnInit(): void {
  }

}
