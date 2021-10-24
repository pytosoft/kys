import { stateList } from './../../model/states-list';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { subscriberService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    
 productDialog?: boolean;
  distByState:any[]=[];
  subscriberDetails: any;
  submitted?: boolean;
  statuses?: any[];
  subscriberDialog?: boolean;
  selectedProducts: any;
  subscriberForm!: any;
  panelOpenState = false;
  selected!: number;
  userId: string = '';
  states: any[] = [];
  subscribers: any[] = [];
  admins: any[]=[];
  data: any[]=[];
  DistrictForm!: FormGroup;
  Status = []=[{
    name: 'Active',
  label: 'Active'},{
    name:'InActive',
    label:'InActive'
  }]
  
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
    private subscriberService: subscriberService, private fb: FormBuilder, private _loader: LoaderService,
    private router:Router, private _adminService:AdminService
  ) { }

  ngOnInit(): void {

    const id = localStorage.getItem('userID');
    if(typeof id === 'string'){
      this.userId =  id;
    }
    this.getAllsubscriber()
    this.addsubscriberForm()
    this.getStates()
    this.getAllAdmin()
    this.DistrictForm = this.fb.group({
      admin:[''],
      city: ['',Validators.required],
      state: ['',Validators.required],
      status:[''],
     startDate:[''],
      endDate:['']
    });
  }
  getAllAdmin(){
    this._adminService.getAllAdmin()
    .subscribe(res => {
     this.admins = res.data;
      this.data = res.data.filter((admin:any) => !admin.isSuperAdmin);
  
    })
  }
  onSubmit(){
this.DistrictForm.value
  }
  subscribeAdmin(){
    // let reqData : AdminRequestI = new AdminRequest();
    // reqData.subscriberId = this.subscriberDetails.value.username;
    // reqData.password = this.loginForm.value.password

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
  getStates(){
    this.subscriberService.getState().subscribe(
      data => {
         data = data.data;
          for(let i=0; i<=data.length; i++){
            this.states.push({
              code: data[i],
              name: data[i]
            })
          }   
    
      }
    )
  }

 //this.distByState=0
  changeStates(){
  this.distByState = []
   this.subscriberService.getDistrict(this.subscriberForm.value.state).subscribe(
    data =>{
   data=data.data;
   for(let i=0; i<=data.length; i++){
    this.distByState.push({
      code: data[i],
      name: data[i]
    })
  }   
   
    }
  )
  }
  adminChangeState(){
    this.distByState = []
     this.subscriberService.getDistrict(this.DistrictForm.value.state).subscribe(
      data =>{
     data=data.data;
     for(let i=0; i<=data.length; i++){
      this.distByState.push({
        code: data[i],
        name: data[i]
      })
    }   
     
      }
    )
    }
  get name() {
    return this.subscriberForm.get('name');
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
      this.subscribers = subscriber.data;

    })
  }
//this is post api for post subscriber

  postAllsubscriber(){
 
 const reqData ={
  name: this.DistrictForm.value.name,
  state: this.DistrictForm.value.state,
  city:this.DistrictForm.value.city,
 date:this.DistrictForm.value.date,
 updateDate:this.subscriberForm.value.updateDate
 }
 this.subscriberService.postSubscriber(reqData).subscribe(arg=>{
   console.log(arg)
 })
  }


  profileInfo(id:string) {
this.router.navigate(["app/user/profile/"+id])
  }

  subscriberDataAdd() {
    this.subscriberDialog = true;
    this.submitted = true;
    let reqData = this.subscriberForm.value;
    if(this.name.invalid || this.email || this.fatherName.invalid || this.address.invalid || this.city.invalid
      || this.mobile.invalid || this.mobile.pinCode  || this.mobile.state){
      return
    }
    if (reqData && reqData._id) {
      this.subscriberService.subscriberUpdate(this.subscriberForm.value).subscribe(arg => {
        this.subscriberDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: arg.message,
          life: 3000,
        });
        this.getAllsubscriber();
      })
    }
else{
  const req = {
    "name": this.subscriberForm.value.name,
    "email": this.subscriberForm.value.email,
    "fatherName": this.subscriberForm.value.fatherName,
    "address": this.subscriberForm.value.address,
    "distByState": this.subscriberForm.value.city,
    "mobile": this.subscriberForm.value.mobile,
    "pinCode": this.subscriberForm.value.pinCode,
    "state": this.subscriberForm.value.state,
    "createdBy": this.userId
  }
  this.subscriberService.subscriberPost(req).subscribe(arg => {

    this.subscriberDialog = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: arg.message,
      life: 3000,
    });
    this.getAllsubscriber();
  });
}


  }

  subscriberEdit(data: any) {
    this.subscriberDialog = true;
    this.subscriberForm.addControl('_id', new FormControl(''));
    this.subscriberForm.patchValue(data);
    this.subscriberForm.controls['email'].disable()  
    

  }

  openNew() {
    this.submitted = false;
    this.subscriberDialog = true;
    this.subscriberForm.reset();
  }


  hideDialog() {
    this.subscriberDialog = false;
    this.submitted = false;
  }
  get email() {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(String(this.subscriberForm.value.email).toLowerCase());
  }
  filterByName(val: string){
    if(val){
      this.subscriberDetails = this.subscribers.filter(function (e: { name: string | string[]; }) {
        return e.name.includes(val);
       })
    } else{
      this.subscriberDetails = this.subscribers;
    }

  }
}


