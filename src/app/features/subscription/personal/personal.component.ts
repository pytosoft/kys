import { SubcriptionService } from './../../../core/services/subcription/subcription.service';
import { Router } from '@angular/router';
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
  constructor(private _fb: FormBuilder, private _router: Router,
    private _service: SubcriptionService) { }
  states: SelectItem[] = [];
  ngOnInit(): void {
  this.initlization();
  this.states = stateList;
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
    this._service.saveSubscriber(this.userInformationForm.value)
    .subscribe(res => {
      console.log(res)
      this._router.navigate(['app/subscription/plan'])
    })
  }
  prevPage(){
    this._router.navigate(['app/subscription/user'])
  }
}
