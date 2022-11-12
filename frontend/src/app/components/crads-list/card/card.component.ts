import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() card?: Item
  cardId?: Item
  addToCartBtn: string = 'add to cart'
  showMoreBtn: string = 'show more'
  constructor(private cartService: CartService) { }

  getCard(id: string) {
    this.cartService.getItemById(id).subscribe(card => {
      this.cardId = card
    })
  }

}
