import { stateList } from './../../model/states-list';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { subscriberService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  subscriberDetails: any[] = []
  submitted?: boolean;
  statuses?: any[];
  subscriberDialog?: boolean;
  selectedProducts: any;
  subscriberForm!: any;
  panelOpenState = false;
  selected!: number;
  userId: string = '';
  states: any[] = stateList;
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
    private subscriberService: subscriberService, private fb: FormBuilder, private _loader: LoaderService,
    private router:Router
  ) { }

  ngOnInit(): void {
   
    const id = localStorage.getItem('userID');
    if(typeof id === 'string'){
      this.userId =  id;   
    }
    this.getAllsubscriber()
    this.addsubscriberForm()
  }


  addsubscriberForm() {
    this.subscriberForm = this.fb.group({

      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      fatherName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      pinCode: ['', [Validators.required]],
      state: ['', [Validators.required]]
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




  getAllsubscriber() {
    this.subscriberDialog = false;
    this._loader.show();
    this.subscriberService.subscriberGet(this.userId).subscribe(subscriber => {
      this._loader.hide();
      this.subscriberDetails = subscriber.data

    })
  }

  profileInfo(id:string) {
    
    
this.router.navigate(["app/user/profile/"+id])
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
      "state": this.subscriberForm.value.state,
      "createdBy": this.userId
    }
    this.subscriberService.subscriberPost(reqData).subscribe(arg => {

      this.subscriberDialog = false;
      this.getAllsubscriber();
    });

  }

  subscriberEdit(data: any) {
    this.subscriberDialog = true;
    this.subscriberForm.addControl['_id'];
    this.subscriberForm.patchValue(data);
  }

  openNew() {
    this.submitted = false;
    this.subscriberDialog = true;
  }


  hideDialog() {
    this.subscriberDialog = false;
    this.submitted = false;
  }


  updatesubscriberData() {
    this.subscriberService.subscriberUpdate(this.subscriberForm.value).subscribe(arg => {
      this.subscriberDialog = false;
      this.getAllsubscriber();
    })
  }
}


