import { Component, OnInit } from '@angular/core';
import { SubcriptionService } from 'src/app/core/services/subcription/subcription.service';
declare let html2canvas: any;
import { jsPDF } from "jspdf";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { subscriberService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  subscriptionList: any[] = [];
  DistrictForm!: any;
  states: any[] = [];
  distByState: any[] = [];

  constructor(private _service: SubcriptionService, private _fb: FormBuilder, private subscriberService: subscriberService) { }

  ngOnInit(): void {
    this.getStates();
    // this.onSubmit();
    this.getSubscriptionList();
    this.DistrictForm = this._fb.group({
      city: [''],
      state: ['']

    })


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
    this._service.getSubscriptionList()
      .subscribe(res => {
        res.data.forEach((element: { deliveryAddress: any; }) => {
          if (element.deliveryAddress) {
            this.subscriptionList.push(element.deliveryAddress)
          }
        });
      })
  }

  onSubmit() {
    // console.log(this.DistrictForm.value)
    // this._service.getSubscriptionList()
    //   .subscribe(res => {
    //     res.data.forEach((element: { deliveryAddress: any; }) => {
    //       if (element.deliveryAddress) {
    //         this.subscriptionList.push(element.deliveryAddress)
    //       }
    //     });
    //   })

  
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
  changeStates() {
this.distByState=[]
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
