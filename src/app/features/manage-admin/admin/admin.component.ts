import { ConfirmationService, MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { AdminService } from './../../../core/services/admin/admin.service';
import { Component, OnInit } from '@angular/core';
import { stateList } from './../../../model/states-list';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  data: any[] = [];
  adminDialog: boolean = false;
  submitted: boolean = false;
  adminForm:any;
  states: any[] = stateList;

  constructor(private _service: AdminService, private _spinner: LoaderService,
     private _fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.getAllAdmin())
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
       console.log(res)
       this.data = res.data.filter((admin:any) => !admin.isSuperAdmin);
       this._spinner.hide();
     })
   }

  showAddAdmin(){
    this.adminDialog = true;
    this.adminForm.reset();
  }
  
  filterByName(val: string){

  }

  // deleteAdmin(admin: any) {
  //   this.confirmationService.confirm({
  //     message: `Are you sure you want to ${admin.active ? 'deactivate'+ admin.name : 'activate'+ admin.name} ?`,
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',

  //     accept: () => {
  //       this._service.deleteAdmin(admin).subscribe((res) => {
  //         this.messageService.add({
  //           severity: 'success',
  //           summary: 'Successful',
  //           detail: res.message,
  //           life: 3000,
  //         });
  //       });
  //     },
  //   });
  // }


  // editAdmin(data: any){
  
  //     this.adminDialog = true;
  //     // this.adminForm.addControl['_id'];
  //     this.adminForm.patchValue(data);
    
  // }

  // updateSubscriberData() {
  //   this._service.editAdmin(this.adminForm.value).subscribe(arg => {
  //     this.adminDialog = false;
  //     this.getAllAdmin();
  //   })
  // }
  // hideDialog(){

  // }


addAdmin(){
  this.submitted = true;
  const reqData = {
    "name": this.adminForm.value.name,
    "email": this.adminForm.value.email,
    "password": this.adminForm.value.fatherName
  }

  this._service.saveAdmin(reqData).subscribe(arg => {

    this.submitted = false;
    this.getAllAdmin();
    this.adminForm.reset();
  });
}

  /**
   * initilization
   */


   initilization(){
     this.adminForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.email]
      
     })
   }
   get name() {
    return this.adminForm.get('name');
  }
  get email() {
    return this.adminForm.get('email');
  }
  get password() {
    return this.adminForm.get('password');
  }
 
   addClick(){
console.log(this.adminForm.value)
   }
}


