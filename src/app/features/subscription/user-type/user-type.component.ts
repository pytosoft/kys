import { SubcriptionService } from './../../../core/services/subcription/subcription.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.scss']
})
export class UserTypeComponent implements OnInit {

  userInformationForm!: FormGroup;

  submitted: boolean = false;
  users = [
    {label: 'New User', value: 'New'},
    {label: 'Existing User', value: 'Existing'},
    ]

  constructor(private router: Router, private _fb: FormBuilder, private _service: SubcriptionService) { }

  ngOnInit() {
    this.initlization();
    }

  nextPage() {
    if(this.userInformationForm.value && this.userInformationForm.value.mobile && this.userInformationForm.value.mobile.length ===10){
      this._service.getSubcriberInfoByMobile(this.userInformationForm.value.mobile)
      .subscribe(res => {
        this.router.navigate(['app/subscription/personal/'+res.data.id]);
      })
    } else{
      this.router.navigate(['app/subscription/personal']);
      this.submitted = true;
    }
  }

  initlization(): void{
    this.userInformationForm = this._fb.group({
      userType: [ 'New', Validators.required],
      mobile: ['']
    })
  }

  public get isExisting() : boolean {
    if(this.userInformationForm.value && this.userInformationForm.value.userType === 'Existing')
      return true;
    return false
  }


}
