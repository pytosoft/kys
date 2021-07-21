import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { SubcriptionService } from './../../../core/services/subcription/subcription.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  subcriberInfo: any;
  subscriberId: string = '';
  seletedPlans: any[] = [];
  totalAmount: number = 0;
  today = new Date();
  deliverForm!: FormGroup;
  constructor(private _router: Router,  private activeRoute: ActivatedRoute, private _fb: FormBuilder,
     private _service: SubcriptionService, private messageService: MessageService) { }

  ngOnInit(): void {
        this.activeRoute.params.subscribe(query => {
    if(query.subsId){
      this.subscriberId = query.subsId;
      this.getSubcriberInfoById()
    }
    const plans = localStorage.getItem('selectedPlan');
    if(typeof plans === 'string'){
      this.seletedPlans =  JSON.parse(plans);
    }
    this.totalAmount = 0;
    this.seletedPlans.forEach(element => {
      this.totalAmount += element.price;
      var dt = new Date();
      dt.setMonth( dt.getMonth() + element.duration );
      element.new = true;
      element.startDate = this.today;
      element.endDate = dt; ​
      element.active = true;
      delete element.books;
      delete element._id;
    });
  })
  this.initlizationForm();
  }
  complete(){
    if(this.subcriberInfo.subcriptions && this.subcriberInfo.subcriptions.length > 0){
      this.subcriberInfo.subcriptions.forEach((element: { new: boolean; }) => {
        element.new = false;
      });
    } else {
      this.subcriberInfo.subcriptions = [];
    }
    this.seletedPlans.forEach(element => {
      element.deliveryAddress = this.deliverForm.value
      element.subscriberId = this.subscriberId
      element.createdBy = localStorage.getItem('userID')
    });
    const reqData = {
      "subscriberId": this.subscriberId,
      "createdBy": localStorage.getItem('userID'),
      "totalAmount": this.totalAmount,
      "plans": this.seletedPlans
    }
    this._service.saveSubcription(reqData)
    .subscribe(res => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: res.message,
        life: 3000,
      });
      this._router.navigate(['app/user'])

    })
  }
  prevPage(){
    this._router.navigate(['app/subscription/plan/'+this.subscriberId])
  }
   getSubcriberInfoById(){
    this._service.getSubcriberInfoById(this.subscriberId)
    .subscribe(res => {
      this.subcriberInfo =res.data;
      this.deliverForm.patchValue(res.data)
    })
  }
  initlizationForm(){
    this.deliverForm = this._fb.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      pinCode: ['', Validators.required],
      locality: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      landmark: [''],
      secondaryPhone: ['']
    })
  }
}
