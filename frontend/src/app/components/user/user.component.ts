import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private authListenerSubs: Subscription | undefined
  userIsAuthenticated: boolean = false
  user?: User
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth()
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated
    })
    this.user = this.authService.getUserData()
  }

  signIn() {
    this.router.navigate(['signIn'])
  }

  logOut() {
    this.user = {}
    this.authService.logOut()
  }

  ngOnDestroy() {
    this.authListenerSubs?.unsubscribe()
  }

}