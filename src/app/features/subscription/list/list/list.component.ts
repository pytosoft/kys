import { Component, OnInit } from '@angular/core';
import { SubcriptionService } from 'src/app/core/services/subcription/subcription.service';

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
