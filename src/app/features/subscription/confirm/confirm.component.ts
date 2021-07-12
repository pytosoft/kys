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
    });
  })
  }
  complete(){
    const reqData = {
      "subscriberId": this.subscriberId,
      "givenBy": localStorage.getItem('userID'),
      "startDate": this.today.getTime(),
      "endDate": 0,
      "active": true,
      "plans": this.seletedPlans
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
