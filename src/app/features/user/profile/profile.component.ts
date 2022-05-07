import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { subscriberDetail } from 'src/app/model/user';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { subscriberService } from 'src/app/core/services/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PlanService } from 'src/app/core/services/plan/plan.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileDetails: any;
  userId: string = '';
  activeSubcriptions: any[] = [];
  inactiveSubcriptions: any[] = [];
  activeTab: string = 'active';
  display: boolean = false;
  plans: any[] = [];
  newPlan: any;
  oldPlanId : any;
  editSubscriptionForm!: FormGroup;
  submitted: boolean = false;
  distByState:any[]=[];
  states: any[] = [];

  constructor(private _loader: LoaderService, private subscriberService: subscriberService,    private _service: PlanService,
     private _route: ActivatedRoute,private _fb: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService) { }


  ngOnInit(): void {
    this._route.params.subscribe(res => {

      if(res && res.id){
        this.userId = res.id;
        this.getProfile(res.id)
      }
    })
    this.getStates();
    this.getPlanList();
    this.editSubscriptionForm = this._fb.group({
      _id: [''],
      plan: [''],
      name: ['', Validators.required],
      fatherName: [''],
      mobile: ['', Validators.required],
      pinCode: ['', Validators.required],
      city: ['', Validators.required],
      landmark: [''],
      locality: [''],
      state: ['', Validators.required],
      address: ['', Validators.required]

    })
  }
  getPlanList(){
    this._service.planGet().subscribe((user) => {
      this.plans = user.data;
    })
  }
  getStates(){
    this.subscriberService.getState().subscribe(
      data => {
         data = data.data;
          for(let i=0; i<=data.length; i++){
            if(data[i]){
              this.states.push({
                code: data[i],
                name: data[i]
              })  
            }
          }   
    
      }
    )
   }
   changeStates(){
 this.distByState=[]
    this.subscriberService.getDistrict(this.editSubscriptionForm.value.state).subscribe(
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

  getProfile(id: any) {
    this._loader.show();
    this.subscriberService.getSubcriberprofileById(id).subscribe(profile => {
      this._loader.hide();
      this.profileDetails = profile.data._doc;
      this.activeSubcriptions = profile.data.subcriptions.filter((res: { active: boolean; }) => res.active === true)
      this.inactiveSubcriptions = profile.data.subcriptions.filter((res: { active: boolean; }) => res.active === false)
    })
  }
  
  editPlan(data: any){
    this.display = true;
    this.distByState=[]
    this.subscriberService.getDistrict(data.deliveryAddress.state).subscribe(
      distList => {
    distList = distList.data;
    for(let i=0; i<=distList.length; i++){
     this.distByState.push({
       code: distList[i],
       name: distList[i]
     })
   }
   this.oldPlanId = data.planId;   
   this.editSubscriptionForm.patchValue({
    _id: data._id,
    plan: data.planId,
    name: data.deliveryAddress.name,
    fatherName: data.deliveryAddress.fatherName,
    city: data.deliveryAddress.city,
    state: data.deliveryAddress.state,
    locality: data.deliveryAddress.locality,
    landmark: data.deliveryAddress.landmark,
    mobile: data.deliveryAddress.mobile,
    address: data.deliveryAddress.address,
    pinCode: data.deliveryAddress.pinCode
  })
     }
   )
  
  }
  deactivateSubcription(id: string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to deactivate this subscription?',
      accept: () => {
        const reqData = {
          "_id": id
        }
        this.subscriberService.deactivateSubcription(reqData).subscribe(res => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: res.message,
            life: 3000,
          });
          this.getProfile(this.userId)
        })
      }
  });
  
  }
  changePlan(){
    let reqData: any = {};
     reqData._id = this.editSubscriptionForm.value._id;
    if(this.editSubscriptionForm.value.plan != this.oldPlanId){
      const plan = this.plans.find(res => res.planId == this.editSubscriptionForm.value.plan)
      const oldPlan = this.plans.find(res => res.planId == this.oldPlanId)
      reqData['planId'] = this.editSubscriptionForm.value.plan;
      reqData.bookId  = plan.bookId;
      reqData.price  = plan.price;
      reqData.name  = plan.name;
      reqData.duration = plan.duration;
      var dt = new Date();
      dt.setMonth( dt.getMonth() + plan.duration );
      reqData.startDate =  new Date().getTime();
      reqData.endDate = dt.getTime(); ​
      if(plan.price != oldPlan.price){
        reqData.diffAmount = plan.price - oldPlan.price;
        alert('Please Pay more amount '+ reqData.diffAmount)
      }
    }
    reqData.deliveryAddress = this.editSubscriptionForm.value
    delete reqData.deliveryAddress._id;
    delete reqData.deliveryAddress.plan;
    reqData.city = this.editSubscriptionForm.value.city;
    reqData.state = this.editSubscriptionForm.value.state;
    this.subscriberService.updateSubcription(reqData).subscribe((res: { message: any; }) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: res.message,
        life: 3000,
      });
      this.display = false;
      this.getProfile(this.userId)
    })
  }


}
