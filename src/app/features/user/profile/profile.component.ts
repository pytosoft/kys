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
  profileDetails: subscriberDetail[] = []
  userId: string = '';

  constructor(private _loader: LoaderService, private subscriberService: subscriberService) { }


  ngOnInit(): void {
    const userId = localStorage.getItem('userID');
    if (typeof userId === 'string') {
      this.userId = userId;

    }
    this.subscriberAdd(userId)
  }

  subscriberAdd(id: any) {
    this._loader.show();
    this.subscriberService.profileGet(id).subscribe(profile => {
      this._loader.hide();
      this.profileDetails = profile.data

    })
  }






}
