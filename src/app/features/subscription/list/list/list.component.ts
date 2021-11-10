import { Component, OnInit } from '@angular/core';
import { SubcriptionService } from 'src/app/core/services/subcription/subcription.service';
declare let html2canvas: any;
import { jsPDF } from "jspdf";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { subscriberService } from 'src/app/core/services/user.service';
import { SelectItemDropdown} from 'src/app/model/user';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { MessageService } from 'primeng/api';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import * as FileSaver from 'file-saver';
import { ProfileService } from 'src/app/core/services/profile/profile.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
data:any[]=[];
  subscriptionList: any[] = [];
  DistrictForm!: FormGroup;
  states: any[] = [];
  city: any[] = []
  distByState: SelectItemDropdown[] = [];

 admins:any[]=[];
 plans:any[]=[];
 isSuperAdmin: boolean = false;
  constructor(private _service: SubcriptionService, private _fb: FormBuilder,
     private subscriberService: subscriberService, private _adminService:AdminService, private _profile: ProfileService,
     private _message: MessageService, private _spinner: LoaderService) { 
      this._profile.isSuperAdmin.subscribe(res => {
        this.isSuperAdmin = res;
      })
     }

  ngOnInit(): void {
    this.getStates();
   this.DistrictForm = this._fb.group({
    admin:[''],
    city: ['',Validators.required],
    state: ['',Validators.required],
    plan:['']
  });
  this.getDropDownData()
  }
  getDropDownData(){
    this._spinner.show();
    this._adminService.getDropDownData()
    .subscribe(res => {
      this._spinner.hide();
     this.admins = res[0].data;
     this.plans = res[2].data;
     for (let i = 0; i <= res[1].data.length; i++) {
      this.states.push({
        code: res[1].data[i],
        name: res[1].data[i]
      })
    }
    })
  }
  resetForm(){
    this.DistrictForm.reset();
  }
 
  printPage() {
    html2canvas(document.querySelector("#capture"), {
      onrendered: function (canvas: { toDataURL: (arg0: string) => any; }) {
        var imgData = canvas.toDataURL(
          'image/png');
        var doc = new jsPDF('p', 'mm');
        doc.addImage(imgData, 'PNG', 10, 10, 150, 90);
        doc.save('address.pdf');
      }
    });
  }
  getSubscriptionList() {
    this._service.getSubscriptionList(this.DistrictForm.value.city)
      .subscribe(res => {
        res.data.forEach((element: { deliveryAddress: any }) => {
          if (element.deliveryAddress && element.deliveryAddress.city == this.DistrictForm.value.city) {
            this.subscriptionList.push(element.deliveryAddress)
          }
        });
      })
  }
  getAddressList() {
    this._spinner.show();
    if(!this.isSuperAdmin){
      this.DistrictForm.patchValue({
        admin: localStorage.getItem("userID")
      })
    }
    this._service.getAddressList(this.DistrictForm.value)
    .subscribe(res => {
      FileSaver.saveAs(res, 'address.pdf');
      this._spinner.hide();
    })
      // .subscribe(res => {
      //   this._spinner.hide();
      //   if(res.data && res.data.length > 0){
      //     res.data.forEach((element: { deliveryAddress: any }) => {
      //         this.subscriptionList.push(element.deliveryAddress)
      //     });  
      //   } else{
      //     this._message.add({
      //       severity: 'success',
      //       summary: 'Success',
      //       detail: 'No address found'
      //     });
      //   }
      // })
  }
  onSubmit() {
    // this.DistrictForm.value
    this.getSubscriptionList()
  }
 
 
  getStates() {
    this.subscriberService.getState().subscribe(
      data => {
        data = data.data;
        for (let i = 0; i <= data.length; i++) {
          this.states.push({
            code: data[i],
            name: data[i]
          })
        }

      }
    )
  }
  
  changeStates( ) {
    this.distByState = []
    this.subscriberService.getDistrict(this.DistrictForm.value.state).subscribe(
      data => {
        data = data.data;
        for (let i = 0; i <= data.length; i++) {
          this.distByState.push({
            code: data[i],
            name: data[i]
          })
        }

      }
    )
  }
  
}
