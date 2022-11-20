import { Item } from '../../interfaces/item'
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.css']
})
export class CardInfoComponent implements OnInit {
  @Input() card?: Item

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private location: Location) {
  }

  ngOnInit() {
    this.getCard()
  }


  getCard() {
    const cardId = this.route.snapshot.paramMap.get('id') ?? ''
    this.cartService.getItemById(cardId).subscribe((card: Item) => {
      this.card = card
    })
  }

  goBack(): void {
    this.location.back();
  }

}
