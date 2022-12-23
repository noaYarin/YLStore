import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms'
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
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  constructor(private authService: AuthService) { }

  signUpForm = new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    userNameFormControl: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    passwordFormControl: new FormControl('', Validators.required),
    isAdminFormControl: new FormControl(false),
  })
  matcher = new MyErrorStateMatcher();

  changeValue(checked: any) {
    this.signUpForm.controls['isAdminFormControl'] = checked
  }

  signUp() {
    let user: User = {}
    user['userName'] = this.signUpForm.value.userNameFormControl
    user['email'] = this.signUpForm.value.emailFormControl
    user['password'] = this.signUpForm.value.passwordFormControl
    user['isAdmin'] = this.signUpForm.value.isAdminFormControl
    console.log(user);

    // this.authService.signUp(user).subscribe(user => {
    //   console.log(user);
    // })
  }

  onResetForm() {
    this.signUpForm.reset()
  }

}
