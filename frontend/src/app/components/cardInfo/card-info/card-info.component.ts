import { CardService } from './../../../services/card.service';
import { SnackBarComponent } from './../../snack-bar/snack-bar.component';
import { Item } from '../../../interfaces/item'
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.css']
})
export class CardInfoComponent implements OnInit {
  card?: Item
  selected: number = 0
  sizesArray: number[] = [32, 34, 36, 38, 40, 42, 44]
  qty: number = 0
  userIsAuthenticated: boolean = false
  user?: User

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private location: Location,
    private _snackBar: MatSnackBar,
    private cardService: CardService,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth()
    this.user = this.authService.getUserData()
    this.getCardInfo()
  }


  getCardInfo() {
    const cardId = this.route.snapshot.paramMap.get('id') ?? ''
    this.cartService.getItemById(cardId).subscribe((card: Item) => {
      this.card = card
    })
  }

  onSelect(value: any) {
    this.selected = value.value
  }

  addToCart() {
    let item: Item = {}
    item['_id'] = this.card?._id
    item['image'] = this.card?.image
    item['title'] = this.card?.title
    item['description'] = this.card?.description
    item['price'] = this.card?.price
    item['type'] = this.card?.type
    item['quantity'] = this.qty
    item['size'] = this.selected
    this.cartService.addItem(item)
    this.openSnackBar('Item added to cart', 'green-snackbar')
  }

  incrementQty() {
    ++this.qty
  }

  decrementQty(): number {
    if (this.qty <= 0) {
      return this.qty = 0
    }
    return --this.qty
  }

  goBack(): void {
    this.location.back();
  }

  deleteCard(cardId?: string) {
    if (!this.userIsAuthenticated || this.user?.isAdmin) {
      return
    }
    this.cardService.deleteCard(cardId).subscribe(() => {
      this.cardService.deletedCardId
      this.openSnackBar('Card Deleted', 'green-snackbar')
      this.router.navigate(['store'])
    }, err => {
      this.openSnackBar(err, 'red-snackbar')
    })
  }

  openSnackBar(msg: string, color: string) {
    return this._snackBar.openFromComponent(SnackBarComponent, {
      data: msg,
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "center",
      panelClass: [color]
    });
  }
}
