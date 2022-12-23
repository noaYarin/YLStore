import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private authService: AuthService) { }

  userForm = new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    passwordFormControl: new FormControl('', Validators.required),
  })
  matcher = new MyErrorStateMatcher();

  changeValue(checked: any) {
    this.userForm.controls['isAdminFormControl'] = checked
  }

  signIn() {
    let user: User = {}
    user['email'] = this.userForm.value.emailFormControl
    user['password'] = this.userForm.value.passwordFormControl
    console.log(user);

    // this.authService.signUp(user).subscribe(user => {
    //   console.log(user);
    // })
  }

  onResetForm() {
    this.userForm.reset()
  }

}
