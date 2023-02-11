import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Item } from 'src/app/interfaces/item';
import { MatSort } from '@angular/material/sort';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  totalPrice: number = 0;
  cartItems: Item[] = []
  dataSource: any
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  @ViewChild('empTbSortWithObject') empTbSortWithObject = new MatSort();

  constructor(
    private cartService: CartService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.filterdCartItems()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  displayedColumns: string[] = ['image', 'name', 'size', 'qty', 'type', 'price', 'trash'];

  goShopping() {
    this.router.navigate(['store']);
  }

  filterdCartItems() {
    this.getCartItems()
    this.cartItems.map((item: any) => {
      if (!item.quantity) {
        item.quantity = 1
      }
      this.totalPrice += item.price * item.quantity
    })
    this.dataSource = new MatTableDataSource(this.cartItems);
  }

  trashItem(item: Item) {
    this.cartService.trashItem(item)
    this.totalPrice -= item.price ?? 0
    this.getCartItems()
    this.dataSource = new MatTableDataSource(this.cartItems);
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: 'Item removed from cart',
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "center",
      panelClass: ["red-snackbar"]
    });
  }

  getCartItems() {
    this.cartItems = this.cartService.cartItems()
  }

  continueBtn() {
    if (!this.authService.getLoggedUser()) {
      return this.router.navigate(['signIn'])
    }
    return this.router.navigate(['paypal'])
  }
}
