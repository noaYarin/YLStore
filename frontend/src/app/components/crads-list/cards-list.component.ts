import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css']
})
export class CardsListComponent implements OnInit {
  @Input() cardsList: Item[] = []
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getItems().subscribe((cards => {
      this.cardsList = cards
    }), err => console.log(err))
  }

}
