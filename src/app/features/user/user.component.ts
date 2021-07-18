import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { subscriberService } from 'src/app/core/services/user.service';
import { subscriberDetail } from '../../model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  subscriberDetails: subscriberDetail[] = []
  submitted?: boolean;
  statuses?: any[];
  subscriberDialog?: boolean;
  selectedProducts: any;
  subscriberForm!: any;
  panelOpenState = false;
  selected!: number;


  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
    private subscriberService: subscriberService, private fb: FormBuilder, private _loader: LoaderService,
  ) { }

  ngOnInit(): void {
    this.subscriberAdd()
    this.addsubscriberForm()
    // this.productService.getProducts().then(data => this.products = data);

    //   this.statuses = [
    //     {label: 'INSTOCK', value: 'instock'},
    //     {label: 'LOWSTOCK', value: 'lowstock'},
    //     {label: 'OUTOFSTOCK', value: 'outofstock'}
    // ];
  }


  addsubscriberForm() {
    this.subscriberForm = this.fb.group({

      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      fatherName: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      pinCode: ['', [Validators.required]],
      state: ['', [Validators.required]],
      "_id": "60ea65423dcb02066fcdcc36"
    })
  }

  filterByName(val: string) {

  }
  get name() {
    return this.subscriberForm.get('name');
  }
  get email() {
    return this.subscriberForm.get('email');
  }
  get fatherName() {
    return this.subscriberForm.get('fatherName');
  }
  get address() {
    return this.subscriberForm.get('address');
  }
  get city() {
    return this.subscriberForm.get('city');
  }
  get mobile() {
    return this.subscriberForm.get('mobile');
  }
  get pinCode() {
    return this.subscriberForm.get('pinCode');
  }
  get state() {
    return this.subscriberForm.get('state');
  }


  subscriberAddClick() {
    console.log(this.subscriberForm.value)
  }




  subscriberAdd() {
    this.subscriberDialog = false;
    this._loader.show();
    this.subscriberService.subscriberGet().subscribe(subscriber => {
      this._loader.hide();
      this.subscriberDetails = subscriber.data

    })
  }

  subscriberDataAdd() {
    this.subscriberDialog = true;
    const reqData = {
      "name": this.subscriberForm.value.name,
      "email": this.subscriberForm.value.email,
      "fatherName": this.subscriberForm.value.fatherName,
      "address": this.subscriberForm.value.address,
      "city": this.subscriberForm.value.city,
      "mobile": this.subscriberForm.value.mobile,
      "pinCode": this.subscriberForm.value.pinCode,
      "state": this.subscriberForm.value.state
    }
    this.subscriberService.subscriberPost(reqData).subscribe(arg => {

      this.subscriberDialog = false;
      this.subscriberAdd();
    });

  }

  subscriberEdit(data: any) {
    this.subscriberDialog = true;
    this.subscriberForm.addControl['_id'];
    this.subscriberForm.patchValue(data);
    // const reqData = {
    //   "name" : this.subscriberForm.value.name,
    //   "email" : this.subscriberForm.value.email,
    //   "fatherName":this.subscriberForm.value.fatherName,
    //   "address" : this.subscriberForm.value.address,
    //   "city" : this.subscriberForm.value.city,
    //   "mobile" : this.subscriberForm.value.mobile,
    //   "pinCode" : this.subscriberForm.value.pinCode,
    //   "state" : this.subscriberForm.value.state,
    //   "_id":"60ea65423dcb02066fcdcc36"
    // }

    // this.subscriberService.subscriberUpdate(reqData).subscribe(arg => {
    //   this.subscriberAdd();
    // })

  }

  openNew() {
   
    this.submitted = false;
    this.subscriberDialog = true;
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
    this.subscriberDialog = false;
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
  updatesubscriberData() {
    this.subscriberService.subscriberUpdate(this.subscriberForm.value).subscribe(arg => {
      this.subscriberDialog = false;
      this.subscriberAdd();
    })
  }
}


