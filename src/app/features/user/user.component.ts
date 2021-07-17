import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/core/services/user.service';
import { UserDetail } from '../../model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  UserDetails: UserDetail[] = []
  product:any;
  products:any;
  submitted?: boolean;
  statuses?: any[];
  productDialog?: boolean;
  selectedProducts:any;
   userForm!:any;
   panelOpenState = false;
   selected!: number;


  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
    private UserService:UserService, private fb: FormBuilder,  private _loader: LoaderService,
    ) { }

  ngOnInit(): void {
    this.UserAdd()
    this.addUserForm()
    // this.productService.getProducts().then(data => this.products = data);

  //   this.statuses = [
  //     {label: 'INSTOCK', value: 'instock'},
  //     {label: 'LOWSTOCK', value: 'lowstock'},
  //     {label: 'OUTOFSTOCK', value: 'outofstock'}
  // ];
  }


addUserForm () {
this.userForm = this.fb.group({

  name: ['',[Validators.required]],
  email: ['',[Validators.required, Validators.email]],
  fatherName: ['',[Validators.required]],
  address: ['',[Validators.required, Validators.minLength(10)]],
  city: ['',[Validators.required]],
  mobile: ['',[Validators.required, Validators.minLength(10)]],
  pinCode: ['',[Validators.required]],
  state: ['',[Validators.required]],
  "_id": "60ea65423dcb02066fcdcc36"
})
}


get name() {
  return this.userForm.get('name');
}
get email() {
  return this.userForm.get('email');
}
get fatherName() {
  return this.userForm.get('fatherName');
}
get address() {
  return this.userForm.get('address');
}
get city() {
  return this.userForm.get('city');
}
get mobile() {
  return this.userForm.get('mobile');
}
get pinCode() {
  return this.userForm.get('pinCode');
}
get state() {
  return this.userForm.get('state');
}


userAddClick(){
  console.log(this.userForm.value)
}




  UserAdd() {
    this.productDialog = false;
    this._loader.show();
    this.UserService.UserGet().subscribe(user =>{
      this._loader.hide();
      this.UserDetails  = user.data

    })
  }

  UserDataAdd() {
    this.productDialog = true;
    const reqData = {
      "name" : this.userForm.value.name,
      "email" : this.userForm.value.email,
      "fatherName":this.userForm.value.fatherName,
      "address" : this.userForm.value.address,
      "city" : this.userForm.value.city,
      "mobile" : this.userForm.value.mobile,
      "pinCode" : this.userForm.value.pinCode,
      "state" : this.userForm.value.state
    }
    this.UserService.UserPost(reqData).subscribe(arg => {

      this.productDialog = false;
      this.UserAdd();
    });

  }

  UserEdit(data: any) {
    this.productDialog = true;
    this.userForm.addControl['_id'];
    this.userForm.patchValue(data);
    // const reqData = {
    //   "name" : this.userForm.value.name,
    //   "email" : this.userForm.value.email,
    //   "fatherName":this.userForm.value.fatherName,
    //   "address" : this.userForm.value.address,
    //   "city" : this.userForm.value.city,
    //   "mobile" : this.userForm.value.mobile,
    //   "pinCode" : this.userForm.value.pinCode,
    //   "state" : this.userForm.value.state,
    //   "_id":"60ea65423dcb02066fcdcc36"
    // }

    // this.UserService.UserUpdate(reqData).subscribe(arg => {
    //   this.UserAdd();
    // })

  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
}

deleteSelectedProducts() {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.products = this.products.filter((val:any) => !this.selectedProducts.includes(val));
          this.selectedProducts = null;
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      }
  });
}


deleteProduct(product: any) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',

      // accept: () => {
      //     this.products = this.products.filter(val => val.id !== product.id);
      //     this.product = {};
      //     this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      // }
  });
}

hideDialog() {
  this.productDialog = false;
  this.submitted = false;
}



//   findIndexById(id: string): number {
//     let index = -1;
//     for (let i = 0; i < this.products.length; i++) {
//         if (this.products[i].id === id) {
//             index = i;
//             break;
//         }
//     }

//     return index;
// }

// createId(): string {
//     let id = '';
//     var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     for ( var i = 0; i < 5; i++ ) {
//         id += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     return id;
// }
updateUserData(){
 this.UserService.UserUpdate(this.userForm.value).subscribe(arg => {
   this.productDialog = false;
      this.UserAdd();
    })
}
}


