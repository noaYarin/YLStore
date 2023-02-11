import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { CardService } from 'src/app/services/card.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private cardService: CardService,
    private authService: AuthService
  ) { }

  createCard = this.fb.group({
    image: [null],
    title: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required]
  })

  @ViewChild('fileInput')
  el!: ElementRef;
  imageUrl: any = ''
  newItem = {}
  userIsAuthenticated: boolean = false

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth()

    this.newItem = {
      image: '',
      title: '',
      description: '',
      price: 0,
      size: 0,
      type: ''
    }
  }

  uploadFile(event: any) {
    let reader = new FileReader();
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageUrl = reader.result;
        this.createCard.patchValue({
          image: reader.result
        });
      }
      reader.onerror = () => {
        this.openSnackBar('There is an error with your image', 'red')
      }
      this.cd.markForCheck();
    }
  }

  onSubmit(event: any) {
    if (!this.userIsAuthenticated) {
      return
    }
    let { image, title, description, price } = event.value
    this.newItem = {
      title,
      image,
      description,
      price,
      size: 0,
      type: ''
    }
    this.cardService.addCard(this.newItem).subscribe(() => {
      this.openSnackBar('Item Added Succesfully', 'green')
    },
      () => {
        this.openSnackBar('Check your data', 'red')
      })

  }

  openSnackBar(msg: string, color: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: msg,
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "center",
      panelClass: [`${color}-snackbar`]
    });
  }
}
