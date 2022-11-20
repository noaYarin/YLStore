import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { StoreComponent } from './components/store/store.component';
import { CartComponent } from './components/cart/cart.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from './components/user/user.component';
import { ItemComponent } from './components/items-list/item/item.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './components/crads-list/card/card.component';
import { CardsListComponent } from '../app/components/crads-list/cards-list.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer/footer.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from "@angular/flex-layout";
import { CardInfoComponent } from './cardInfo/card-info/card-info.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StoreComponent,
    CartComponent,
    NavbarComponent,
    UserComponent,
    ItemComponent,
    ItemsListComponent,
    CardComponent,
    CardsListComponent,
    FooterComponent,
    CardInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatToolbarModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
