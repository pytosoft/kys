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


}
