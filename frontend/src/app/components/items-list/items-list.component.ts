import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {
  itemsList: Item[] = []
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getItems().subscribe((items => {
      this.itemsList = items
    }), err => console.log(err))
  }

}
