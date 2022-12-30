import { CardInfoComponent } from './components/cardInfo/card-info/card-info.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { StoreComponent } from './components/store/store.component';
import { UserComponent } from './components/user/user.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'store', component: StoreComponent },
  { path: 'cardInfo/:id', component: CardInfoComponent },
  { path: 'cart', component: CartComponent },
  { path: 'user', component: UserComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'signIn', component: SignInComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
