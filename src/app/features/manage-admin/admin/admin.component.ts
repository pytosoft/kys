import { ConfirmationService, MessageService } from 'primeng/api';
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
  constructor(private _service: AdminService, private _spinner: LoaderService,
     private _fb: FormBuilder, private confirmationService: ConfirmationService,
     private messageService: MessageService) { }

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
  deleteAdmin(admin: any) {
    this.confirmationService.confirm({
      message: `Are you sure you want to ${admin.active ? 'deactivate'+ admin.name : 'activate'+ admin.name} ?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this._service.deleteAdmin(admin).subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: res.message,
            life: 3000,
          });
        });
      },
    });
  }
  editAdmin(){

  }
  hideDialog(){

  }
  saveAdmin(){
    this.submitted = true;
    if(this.adminForm.invalid)
      return

    this._spinner.show();
    this._service.saveAdmin(this.adminForm.value)
    .subscribe(() => {
      this.adminDialog = false;
      this.submitted = false;
      this.adminForm.reset();
      this.getAllAdmin();
    })
  }
  /**
   * initilization
   */
   initilization(){
     this.adminForm = this._fb.group({
       name: ['', Validators.required],
       email: ['', Validators.required],
       password: ['', Validators.required],
       fatherName: ['', Validators.required],
       mobile: ['', Validators.required],
       city: ['', Validators.required],
       address: ['', Validators.required],
       region: ['', Validators.required],
       state: ['', Validators.required]
     })
   }
}
