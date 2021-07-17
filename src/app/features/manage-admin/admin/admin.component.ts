import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { AdminService } from './../../../core/services/admin/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  data: any[] = [];
  adminDialog: boolean = false;
  submitted: boolean = false;
  adminForm!: FormGroup;
  constructor(private _service: AdminService, private _spinner: LoaderService, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.initilization();
    this.getAllAdmin();
  }
  /**
   * getAllAdmin
   */
   getAllAdmin(){
     this._spinner.show();
     this._service.getAllAdmin()
     .subscribe(res => {
       this.data = res.data;
       this._spinner.hide();
     })
   }
  addAdmin(){

  }
  filterByName(val: string){

  }
  deleteAdmin(){

  }
  editAdmin(){

  }
  hideDialog(){

  }
  saveAdmin(){

  }
  /**
   * initilization
   */
   initilization(){
     this.adminForm = this._fb.group({
       name: ['', Validators.required],
       fatherName: ['', Validators.required],
       mobile: ['', Validators.required],
       city: ['', Validators.required],
       address: ['', Validators.required],
       region: ['', Validators.required]
     })
   }
}
