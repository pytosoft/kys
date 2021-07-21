import { SubcriptionService } from './../../../core/services/subcription/subcription.service';
import { Router, ActivatedRoute } from '@angular/router';
import { stateList } from './../../../model/states-list';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  userInformationForm!: FormGroup;
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
      mobile: ['', Validators.required],
      email: [''],
      fatherName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pinCode: [0, Validators.required]
    })
  }
  nextPage(){
    if(this.subscriberId){
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
