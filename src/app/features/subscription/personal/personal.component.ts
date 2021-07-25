import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubcriptionService } from './../../../core/services/subcription/subcription.service';
import { stateList } from './../../../model/states-list';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  userInformationForm!: FormGroup;
  submitted: boolean = false;
  constructor(private _fb: FormBuilder, private _router: Router, private activeRoute: ActivatedRoute,
    private _service: SubcriptionService) { }
  states: any[] = [];
  subscriberId: string = '';
  ngOnInit(): void {
  this.initlization();
  this.states = stateList;
  this.activeRoute.params.subscribe(query => {
    if(query.id){
      this.subscriberId = query.id;
      this.getSubcriberInfoById(query.id)
    }
  })
  }

  initlization(): void{
    this.userInformationForm = this._fb.group({
      name: [ '', Validators.required],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: [''],
      fatherName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pinCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    })
  }
  nextPage(){
    this.submitted = true;
    if(this.name?.invalid || this.mobile?.invalid || this.fatherName?.invalid || this.address?.invalid || this.city?.invalid || this.state?.invalid || this.pinCode?.invalid){
      return;
    }
    else if(this.subscriberId){
      let reqData = this.userInformationForm.value;
      reqData['_id'] = this.subscriberId;
      this._service.updateSubscriber(reqData)
      .subscribe(res => {
        this._router.navigate(['app/subscription/plan/'+this.subscriberId])
      })
    } else{
      let reqData = this.userInformationForm.value;
      reqData.createdBy = localStorage.getItem('userID');
      this._service.saveSubscriber(reqData)
    .subscribe(res => {
      this._router.navigate(['app/subscription/plan/'+res.data.id])
    })
    }
  }
  get name() {
    return this.userInformationForm.get('name');
  }
  get fatherName() {
    return this.userInformationForm.get('fatherName');
  }
  get address() {
    return this.userInformationForm.get('address');
  }
  get city() {
    return this.userInformationForm.get('city');
  }
  get mobile() {
    return this.userInformationForm.get('mobile');
  }
  get pinCode() {
    return this.userInformationForm.get('pinCode');
  }
  get state() {
    return this.userInformationForm.get('state');
  }
  prevPage(){
    this._router.navigate(['app/subscription/user'])
  }
  getSubcriberInfoById(id: string){
    this._service.getSubcriberInfoById(id)
    .subscribe(res => {
      this.userInformationForm.patchValue(res.data)
    })
  }
}
