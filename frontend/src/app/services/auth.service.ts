import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private configUrl = "http://localhost:3000" ?? ''
  user?: User
  constructor(private http: HttpClient) { }

  signIn(user: User): Observable<User> {
    return this.http.post<User>(this.configUrl + '/user/signIn', user).pipe(
      catchError(err => {
        throw new Error(err.error)
      })
    );
  }
  signUp(user: User): Observable<User> {
    return this.http.post<User>(this.configUrl + '/user/signUp', user).pipe(
      catchError(err => {
        throw new Error(err.error)
      })
    );
  }
}
