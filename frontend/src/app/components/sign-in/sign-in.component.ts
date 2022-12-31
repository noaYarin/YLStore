import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  constructor(private authService: AuthService, private _snackBar: MatSnackBar, private router: Router) { }

  userForm = new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    passwordFormControl: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]{9}')]),
  })
  matcher = new MyErrorStateMatcher();

  changeValue(checked: any) {
    this.userForm.controls['isAdminFormControl'] = checked
  }

  signIn() {
    let user: User = {}
    user['email'] = this.userForm.value.emailFormControl
    user['password'] = this.userForm.value.passwordFormControl

    this.authService.signIn((user)).subscribe((user: any) => {
      this.authService.user = user.user
      localStorage.setItem('userToken', user.token);
      this._snackBar.openFromComponent(SnackBarComponent, {
        data: `Hello ${user.user.userName}`,
        duration: 3000,
        verticalPosition: "top",
        horizontalPosition: "center",
        panelClass: ["green-snackbar"]
      });
      this.router.navigate(['cart']);

    }, err => {
      this._snackBar.openFromComponent(SnackBarComponent, {
        data: `${err}`,
        duration: 3000,
        verticalPosition: "top",
        horizontalPosition: "center",
        panelClass: ["red-snackbar"]
      });
    })
  }

  onResetForm() {
    this.userForm.reset()
  }

  createAccount() {
    this.router.navigate(['signUp']);
  }

}
