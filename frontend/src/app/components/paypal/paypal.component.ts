import { Component, OnInit } from '@angular/core';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { render } from 'creditcardpayments/creditCardPayments'

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
  isRendered: boolean = false
  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.isRendered = true
    render(
      {
        id: '#myPaypalButtons',
        currency: 'ILS',
        value: '100',
        onApprove: (details) => {
          this._snackBar.openFromComponent(SnackBarComponent, {
            data: 'Transaction Successfull',
            duration: 3000,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ["green-snackbar"]
          });
        }

      }
    )
  }

}
