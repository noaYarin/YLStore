import { CardService } from './../../services/card.service';
import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  list: Item[] = []
  slicedList: Item[] = []
  spinner: boolean = false
  hiddenBtn: boolean = false
  constructor(private cartService: CartService, private cardService: CardService) {
  }

  ngOnInit(): void {
    this.spinner = true
    this.cartService.getItems().subscribe((cards => {
      this.list = cards
      let cardId = this.cardService.deletedCardId
      this.list = this.list.filter(card => card._id !== cardId)
      this.slicedList = this.list.slice(0, 6)
      this.spinner = false
    }), () => this.spinner = false)
  }

  loadMoreItems() {
    let numOfItems = this.slicedList.length + 6;

    if (numOfItems > this.list.length) {
      numOfItems = this.list.length
      this.hiddenBtn = true
    }
    this.slicedList = this.list.slice(0, numOfItems)
  }

}
