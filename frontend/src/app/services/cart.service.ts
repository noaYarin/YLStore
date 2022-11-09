import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private configUrl = "http://localhost:3000"
  itemsList = []
  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.configUrl + '/item/getAllItems')
      .pipe(
        catchError(err => {
          throw new Error(err)
        })
      );
  }
}
