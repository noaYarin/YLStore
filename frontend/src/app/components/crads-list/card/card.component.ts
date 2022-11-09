import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/item';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card?: Item
  addToCartBtn: string = 'add to cart'
  showMoreBtn: string = 'show more'
  constructor() { }

  ngOnInit(): void {
  }

}
