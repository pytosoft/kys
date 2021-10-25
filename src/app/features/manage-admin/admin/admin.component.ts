import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { AdminService } from './../../../core/services/admin/admin.service';
import { stateList } from './../../../model/states-list';
import { subscriberService } from 'src/app/core/services/user.service'
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
  states: any[] = [];
  editMode: boolean = false;
  admins: any[] = [];
  distByState:any[]=[];
  constructor(private _service: AdminService, private _spinner: LoaderService,
     private _fb: FormBuilder, private confirmationService: ConfirmationService, private messageService: MessageService, private subscriberService: subscriberService) { }

  ngOnInit(): void {
    this.initilization();
    this.getAllAdmin();
    this.getStates()
  }

  /**
   * getAllAdmin
   */
  
   getAllAdmin(){
     this._spinner.show();
     this._service.getAllAdmin()
     .subscribe(res => {
      this.admins = res.data;
       this.data = res.data.filter((admin:any) => !admin.isSuperAdmin);
       this._spinner.hide();
     })
   }
   getStates(){
    this.subscriberService.getState().subscribe(
      data => {
         data = data.data;
          for(let i=0; i<=data.length; i++){
            if(data[i]){
              this.states.push({
                code: data[i],
                name: data[i]
              })  
            }
          }   
    
      }
    )
   }
   changeStates(){
 this.distByState=[]
    this.subscriberService.getDistrict(this.adminForm.value.state).subscribe(
     data =>{
    data=data.data;
    for(let i=0; i<=data.length; i++){
     this.distByState.push({
       code: data[i],
       name: data[i]
     })
   }   
    
     }
   )
   }

  showAddAdmin(){
    this.adminDialog = true;
    this.adminForm.reset();
  }


  deleteAdmin(admin: any) {

    this.confirmationService.confirm({
      message: `Are you sure you want to ${admin.active ? 'deactivate '+ admin.name : 'activate '+ admin.name} ?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        admin.active = !admin.active;
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


  editAdmin(data: any){
    this.editMode = true;
      this.adminDialog = true;
      this.adminForm.addControl['_id'];
      this.adminForm.addControl('_id', new FormControl(''));

      this.adminForm.patchValue(data);
  }


  /**
   * initilization
   */


   initilization(){
     this.adminForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: [''],
      fatherName: ['', Validators.required],
      mobile: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      region: ['', Validators.required],
      state: ['', Validators.required]
     })
   }
   get name() {
    return this.adminForm.get('name');
  }
  get email() {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(String(this.adminForm.value.email).toLowerCase());
  }
  get password() {
    return this.adminForm.get('password');
  }

  saveAdmin(){
    this.submitted = true;
    if(this.adminForm.invalid)
      return
    if(this.email)
      return
    this._spinner.show();
    let reqData = this.adminForm.value;
    if(!this.editMode){
      this._service.saveAdmin(reqData)
      .subscribe(() => {
        this.adminDialog = false;
        this.submitted = false;
        this.adminForm.reset();
        this.getAllAdmin();
      })
    } else{
      delete reqData.password
      this._service.editAdmin(reqData)
      .subscribe(() => {
        this.adminDialog = false;
        this.submitted = false;
        this.adminForm.reset();
        this.getAllAdmin();
        this.editMode = false;
      })
    }

  }

  filterByName(val: string) {
    if (val) {
      this.data = this.admins.filter(function (e: {
        name: string | string[], isSuperAdmin: boolean
      }) {
        return e.name.includes(val) && e.isSuperAdmin == true;
      });
    } else {
      this.data = this.admins;
    }
  }

}


