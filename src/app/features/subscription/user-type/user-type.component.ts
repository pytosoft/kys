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

  constructor(private router: Router, private _fb: FormBuilder) { }

  ngOnInit() {
    this.initlization();
    }

  nextPage() {
      // if (this.personalInformation.firstname && this.personalInformation.lastname && this.personalInformation.age) {
      //     // this.ticketService.ticketInformation.personalInformation = this.personalInformation;
          this.router.navigate(['app/subscription/personal']);

      //     return;
      // }

      this.submitted = true;
  }

  initlization(): void{
    this.userInformationForm = this._fb.group({
      userType: [ 'New', Validators.required],
      mobileNumber: ['']
    })
  }

  public get isExisting() : boolean {
    if(this.userInformationForm.value && this.userInformationForm.value.userType === 'Existing')
      return true;
    return false
  }


}
