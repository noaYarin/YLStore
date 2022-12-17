import { Component, Input } from '@angular/core';
import { Item } from 'src/app/interfaces/item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css']
})
export class CardsListComponent {
  @Input() cardsList: Item[] = []
  term: string = ''
  constructor(private cartService: CartService) { }

}
