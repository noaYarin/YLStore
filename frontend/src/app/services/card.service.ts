import { catchError, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private configUrl = "http://localhost:3000" ?? ''

  constructor(private http: HttpClient) { }

  addCard(itemData: Item): Observable<Item> {
    return this.http.post<Item>(this.configUrl + '/item/addItem', itemData).pipe(
      catchError(err => {
        throw new Error(err.message)
      })
    );
  }

  getCardById(itemId: string) {
    return this.http.get<Item>(this.configUrl + `/item/getItem/${itemId}`).pipe(
      catchError(err => {
        throw new Error(err.message)
      })
    );
  }

  updateCard(itemData?: Item): Observable<Item> {
    return this.http.put<Item>(this.configUrl + `/item/updateItem/${itemData?._id}`, itemData).pipe(
      catchError(err => {
        throw new Error(err.message)
      })
    );
  }

  deleteCard(itemId?: string): Observable<any> {
    return this.http.delete<{ itemId: string }>(this.configUrl + `/item/deleteItem/${itemId}`).pipe(
      catchError(err => {
        throw new Error(err.message)
      })
    );
  }
}
