import { Component, Input } from '@angular/core';
import { Item } from 'src/app/interfaces/item';

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
}
