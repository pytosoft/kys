import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from './../../../core/services/profile/profile.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: any;
  form!: FormGroup;
  resetPasswordForm!: FormGroup;
  submitted: boolean = false;

  constructor(private _service: ProfileService, private _route: ActivatedRoute,
    private _fb: FormBuilder, private messageService: MessageService, private _spinner: LoaderService) { }

  ngOnInit(): void {
    let id = ''
    this._route.params.subscribe(res => {
      if(res && res.id){
        id = res.id
      } else{
        const userId  = localStorage.getItem('userID');
        if (typeof userId === 'string') {
          id = userId
        }
      }
      this.getProfile(id)
    })
    this.form = this._fb.group({
      depositAmount: ['', Validators.required],
      note: ['']
    })
    this.resetPasswordForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })

  }

  getProfile(id: string){
    this._service.getProfileById(id)
    .subscribe(res => {
      this.profile = res.data
    })
}
deposit(){
  let reqData = this.form.value;
  reqData.id = localStorage.getItem('userID');
  reqData.name = this.profile.name;
  this._spinner.show();
  this._service.depositAmountRequest(reqData)
  .subscribe(res => {
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: res.message,
      life: 3000,
    });
    this._spinner.hide();
    this.form.reset();
  })
}
verify(item: any){
  this._spinner.show();
  item.adminId = localStorage.getItem('userID');
  this._service.verifyAmount(item)
  .subscribe(res => {
    this._spinner.hide();
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: res.message,
      life: 3000,
    });
    this.profile.depositAmountRequest.forEach((element: { id: any; isVerifyed: boolean; }) => {
      if(element.id === item.id){
        element.isVerifyed = true;
      }
    });
  })
}
changePassword() {
  this.resetPasswordForm.patchValue({'email': this.profile?.email})
  if(this.resetPasswordForm.invalid)
    return
  const reqData = this.resetPasswordForm.value;
  this._spinner.show();
  this._service.changePassword(reqData)
  .subscribe(res => {
    this._spinner.hide();
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: res.message,
      life: 3000,
    })
    this.resetPasswordForm.reset();
    this.submitted = false;
  })
}

public get password() : any {
  return this.resetPasswordForm.get('password')
}
public get newPassword() : any {
  return this.resetPasswordForm.get('newPassword')
}
public get confirmPassword() : boolean {
  if(this.resetPasswordForm.value.newPassword === this.resetPasswordForm.value.confirmPassword && this.resetPasswordForm.value.confirmPassword !== '')
    return true;
  return false;
}

}
