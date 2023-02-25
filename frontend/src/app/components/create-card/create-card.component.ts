import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { CardService } from 'src/app/services/card.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/interfaces/item';
@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
    private cardService: CardService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  card = this.fb.group({
    image: [null, [Validators.required]],
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    price: ['', [Validators.required]]
  })

  get image() {
    return this.card.get('image');
  }
  get title() {
    return this.card.get('title');
  }
  get description() {
    return this.card.get('description');
  }
  get price() {
    return this.card.get('price');
  }

  @ViewChild('fileInput')
  el!: ElementRef;
  imageUrl: any = ''
  newItem: any = {}
  userIsAuthenticated: boolean = false
  isEditMode: boolean = false
  item?: any
  isUploadedImage: boolean = false
  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth()

    const itemId = this.route.snapshot.paramMap.get('id');
    if (itemId) {
      this.cardService.getCardById(itemId ?? '').subscribe((item => {
        this.isEditMode = true
        this.item = item
        this.imageUrl = item.image
        this.card.patchValue({
          image: item.image
        });
        if (!item.image) {
          this.isUploadedImage = true
        }
      }))
    }

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
    let file = event.target.files[0] as File
    if (event.target.files && event.target.files[0]) {
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        this.card.patchValue({
          image: reader.result
        });
      }
      reader.onerror = () => {
        this.openSnackBar('There is an error with your image', 'red')
      }
      reader.readAsDataURL(file);
      this.cd.markForCheck();
    }
  }

  onSubmit(event: any) {
    if (!this.userIsAuthenticated) {
      throw new Error('User not authenticated')
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
    if (!this.isEditMode) {
      return this.cardService.addCard(this.newItem).subscribe(() => {
        this.openSnackBar('Item Added Succesfully', 'green')
        this.router.navigate(['store'])
      },
        () => {
          this.openSnackBar('Check your data', 'red')
        })
    }

    for (const newItemKey in this.newItem) {
      let arrayOfKeys = Object.keys(this.item ?? '')
      arrayOfKeys.map((key: string) => {
        if (key === newItemKey) {
          this.item[key] = this.newItem[newItemKey]
        }
      })
    }

    return this.cardService.updateCard(this.item).subscribe(() => {
      this.openSnackBar('Item Updated Succesfully', 'green')
      this.router.navigate(['store'])
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
