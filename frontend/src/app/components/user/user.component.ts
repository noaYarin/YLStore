import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user?: User
  hideBtn: boolean = false
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.user
    if (!this.user) {
      this.hideBtn = true
    }
  }

  signIn() {
    this.router.navigate(['signIn'])
  }

  logOut() {
    if (localStorage.getItem('userToken')) {
      localStorage.removeItem('userToken')
      this.router.navigate(['home']);
    }
  }

}