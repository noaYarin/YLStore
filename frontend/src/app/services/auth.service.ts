import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private configUrl = "http://localhost:3000" ?? ''
  user?: User
  private token: string = ''
  private isAuthenticated: boolean = false
  private authStatusListener = new Subject<boolean>()
  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token
  }

  getIsAuth() {
    return this.isAuthenticated
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable()
  }

  signIn(user: User) {
    return this.http.post<any>(this.configUrl + '/user/signIn', user).pipe(
      map((res) => {
        this.user = res.user
        this.token = res.token
        this.isAuthenticated = true
        this.saveAuthData(this.token)
        this.authStatusListener.next(true)
        this.user = this.getUserData()
      }),
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

  logOut() {
    this.token = '';
    this.user = {}
    this.isAuthenticated = false
    this.authStatusListener.next(false)
    this.clearAuthData()
    this.router.navigate(['/']);
  }

  autoAuthUser() {
    let authData = this.getAuthData()
    if (!authData) return
    this.token = authData.token
    this.isAuthenticated = true
    this.authStatusListener.next(true)
  }

  getLoggedUser() {
    return this.getAuthData()
  }

  getUserData() {
    let authData = this.getAuthData()
    if (!authData) return
    return JSON.parse(atob(authData.token.split('.')[1]))
  }

  private saveAuthData(token: string) {
    localStorage.setItem('token', token)
  }

  private clearAuthData() {
    localStorage.removeItem('token')
  }

  private getAuthData() {
    const token = localStorage.getItem('token')
    if (!token) return
    return { token }
  }

}
