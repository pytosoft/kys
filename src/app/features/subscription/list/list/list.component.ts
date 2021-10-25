import { Component, OnInit } from '@angular/core';
import { SubcriptionService } from 'src/app/core/services/subcription/subcription.service';
declare let html2canvas: any;
import { jsPDF } from "jspdf";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { subscriberService } from 'src/app/core/services/user.service';
import { SelectItemDropdown} from 'src/app/model/user';
import { AdminService } from 'src/app/core/services/admin/admin.service';


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

  constructor(private _service: SubcriptionService, private _fb: FormBuilder, private subscriberService: subscriberService, private _adminService:AdminService) { }

  ngOnInit(): void {
    this.getStates();
<<<<<<< .mine
    this.DistrictForm = this._fb.group({
      city: [''],
      state: ['']
    })


=======
   this.DistrictForm = this._fb.group({
    admin:[''],
    city: ['',Validators.required],
    state: ['',Validators.required]
  });
  this.getAllAdmin()
>>>>>>> .theirs
  }
<<<<<<< .mine












=======
  getAllAdmin(){
    this._adminService.getAllAdmin()
    .subscribe(res => {
     this.admins = res.data;
      this.data = res.data.filter((admin:any) => !admin.isSuperAdmin);
  
    })
  }
  resetForm(){
    this.DistrictForm.reset();
  }
 
>>>>>>> .theirs
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
