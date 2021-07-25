import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { subscriberDetail } from 'src/app/model/user';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { subscriberService } from 'src/app/core/services/user.service';
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
  constructor(private _loader: LoaderService, private subscriberService: subscriberService, private _route: ActivatedRoute) { }


  ngOnInit(): void {
    this._route.params.subscribe(res => {

      if(res && res.id){
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





}
