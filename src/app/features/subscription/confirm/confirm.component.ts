import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { SubcriptionService } from './../../../core/services/subcription/subcription.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  subcriberInfo: any;
  subscriberId: string = '';
  seletedPlans: any[] = [];
  totalAmount: number = 0;
  today = new Date();
  constructor(private _router: Router,  private activeRoute: ActivatedRoute,  private _service: SubcriptionService) { }

  ngOnInit(): void {
        this.activeRoute.params.subscribe(query => {
    if(query.subsId){
      this.subscriberId = query.subsId;
      this.getSubcriberInfoById()
    }
    const plans = localStorage.getItem('selectedPlan');
    if(typeof plans === 'string'){
      this.seletedPlans =  JSON.parse(plans);
    }
    this.totalAmount = 0;
    this.seletedPlans.forEach(element => {
      this.totalAmount += element.price;
      var dt = new Date();
      dt.setMonth( dt.getMonth() + element.duration );
      element.new = true;
      element.startDate = this.today;
      element.endDate = dt; ​
      element.active = true;
    });
  })
  }
  complete(){
    if(this.subcriberInfo.subcriptions && this.subcriberInfo.subcriptions.length > 0){
      this.subcriberInfo.subcriptions.forEach((element: { new: boolean; }) => {
        element.new = false;
      });
    } else {
      this.subcriberInfo.subcriptions = [];
    }
    const reqData = {
      "subscriberId": this.subscriberId,
      "givenBy": localStorage.getItem('userID'),
      "plans": [...this.subcriberInfo.subcriptions, ...this.seletedPlans]
    }
    this._service.saveSubcription(reqData)
    .subscribe(res => {
      alert(res.message);

      this._router.navigate(['app/subscription/list'])

    })
  }
  prevPage(){
    this._router.navigate(['app/subscription/plan/'+this.subscriberId])
  }
   getSubcriberInfoById(){
    this._service.getSubcriberInfoById(this.subscriberId)
    .subscribe(res => {
      this.subcriberInfo =res.data;
    })
  }
}
