import { ActivatedRoute } from '@angular/router';
import { ProfileService } from './../../../core/services/profile/profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: any;
  constructor(private _service: ProfileService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = ''
    this._route.params.subscribe(res => {
      if(res && res.id){
        id = res.id
      } else{
        const userId  = localStorage.getItem('userID');
        if (typeof userId === 'string') {
          id = userId
        }
      }
      this.getProfile(id)
    })


  }

  getProfile(id: string){
    this._service.getProfileById(id)
    .subscribe(res => {
      this.profile = res.data
    })
}
}
