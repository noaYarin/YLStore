import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms'
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
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  constructor(private authService: AuthService, private _snackBar: MatSnackBar, private router: Router) { }

  signUpForm = new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    userNameFormControl: new FormControl('', [Validators.required, Validators.minLength(2)]),
    passwordFormControl: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]{9}')]),
    isAdminFormControl: new FormControl(false),
  })
  matcher = new MyErrorStateMatcher();

  changeValue(event: any) {
    this.signUpForm.patchValue({ isAdminFormControl: event.checked })
  }

  signUp() {
    let user: User = {}
    user['userName'] = this.signUpForm.value.userNameFormControl
    user['email'] = this.signUpForm.value.emailFormControl
    user['password'] = this.signUpForm.value.passwordFormControl
    user['isAdmin'] = this.signUpForm.value.isAdminFormControl

    this.authService.signUp(user).subscribe(user => {
      this._snackBar.openFromComponent(SnackBarComponent, {
        data: `Hello ${user.userName}`,
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
    this.signUpForm.reset()
  }

}
