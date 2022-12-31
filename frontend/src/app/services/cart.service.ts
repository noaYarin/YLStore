import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private configUrl = "http://localhost:3000" ?? ''
  itemsList: Item[] = []
  savedItemsList: Item[] = []
  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.configUrl + '/item/getAllItems')
      .pipe(
        catchError(err => {
          throw new Error(err)
        })
      );
  }

  getItemById(id: string): Observable<Item> {
    return this.http.get<Item>(this.configUrl + `/item/getItem/${id}`)
      .pipe(
        catchError(err => {
          throw new Error(err)
        })
      );
  }

  trashItem(item: any) {
    let index = this.itemsList.findIndex((item) => item._id === item._id)
    if (item.quantity === 1) {
      return this.itemsList.splice(index, 1)
    }
    return item.quantity--
  }

  addItem(item: Item) {
    let itemExist: any = this.findItem(item)
    if (!itemExist) {
      return this.itemsList.push(item)
    }
    return itemExist.quantity += item.quantity
  }

  cartItems(): Item[] {
    return this.itemsList
  }

  findItem(item: Item) {
    return this.itemsList.find(itemInCart => itemInCart._id === item._id)
  }

  addSavedItem(item: Item) {
    this.savedItemsList.push(item)
  }
}
