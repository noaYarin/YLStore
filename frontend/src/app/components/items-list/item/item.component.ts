import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  removeBook(arg0: any) {
    throw new Error('Method not implemented.');
  }
  decrement() {
    throw new Error('Method not implemented.');
  }
  increment() {
    throw new Error('Method not implemented.');
  }
  @Input() item?: Item
  constructor() { }

  ngOnInit(): void {
  }

}
