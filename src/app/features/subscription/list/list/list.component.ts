import { Component, OnInit } from '@angular/core';
import { SubcriptionService } from 'src/app/core/services/subcription/subcription.service';
declare let html2canvas: any;
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  subscriptionList: any[] = [];
  constructor(private _service: SubcriptionService) { }

  ngOnInit(): void {
    this.getSubscriptionList()
  }
  printPage(){
    html2canvas(document.querySelector("#capture"), {
      onrendered: function(canvas: { toDataURL: (arg0: string) => any; }) {
          var imgData = canvas.toDataURL(
              'image/png');
          var doc = new jsPDF('p', 'mm');
          doc.addImage(imgData, 'PNG', 10, 10, 150, 90);
          doc.save('address.pdf');
      }
  });
  }
  getSubscriptionList(){
    this._service.getSubscriptionList()
    .subscribe(res => {
      res.data.forEach((element: { deliveryAddress: any; }) => {
        if(element.deliveryAddress){
          this.subscriptionList.push(element.deliveryAddress)
        }
      });
    })
  }
}
