import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  totalPrice: any;
  cartItems: Item[] = []

  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['image', 'name', 'size', 'qty', 'price'];
  dataSource = this.cartItems
}
