import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { subscriberDetail } from 'src/app/model/user';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { subscriberService } from 'src/app/core/services/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PlanService } from 'src/app/core/services/plan/plan.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileDetails: any;
  userId: string = '';
  activeSubcriptions: any[] = [];
  inactiveSubcriptions: any[] = [];
  activeTab: string = 'active';
  display: boolean = false;
  plans: any[] = [];
  newPlan: any;
  oldPlanId : any;
  constructor(private _loader: LoaderService, private subscriberService: subscriberService,    private _service: PlanService,
     private _route: ActivatedRoute, private messageService: MessageService, private confirmationService: ConfirmationService) { }


  ngOnInit(): void {
    this._route.params.subscribe(res => {

      if(res && res.id){
        this.userId = res.id;
        this.getProfile(res.id)
      }
    })
  }

  getProfile(id: any) {
    this._loader.show();
    this.subscriberService.getSubcriberprofileById(id).subscribe(profile => {
      this._loader.hide();
      this.profileDetails = profile.data._doc;
      this.activeSubcriptions = profile.data.subcriptions.filter((res: { active: boolean; }) => res.active === true)
      this.inactiveSubcriptions = profile.data.subcriptions.filter((res: { active: boolean; }) => res.active === false)
    })
  }

  EditPlan(id: string){
    this._loader.show();
    this._service.planGet().subscribe((user) => {
      this.plans = user.data;
      this.display = true;
      this._loader.hide();
      this.oldPlanId = id;
    });
  }
  deactivateSubcription(id: string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to deactivate this subscription?',
      accept: () => {
        const reqData = {
          "_id": id
        }
        this.subscriberService.deactivateSubcription(reqData).subscribe(res => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: res.message,
            life: 3000,
          });
          this.getProfile(this.userId)
        })
      }
  });
  
  }
  changePlan(){
    console.log(this.newPlan)
    const plan = this.plans.find(res => res.planId == this.newPlan)
    console.log(plan)
    const oldPlan = this.plans.find(res => res.planId == this.oldPlanId)
    console.log(oldPlan)
    if(plan.price === oldPlan.price){
      alert('Okay')
    } else {
      alert('Need to  pay more amount '+ (plan.price - oldPlan.price))
    }
  }


}
