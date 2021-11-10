import { ProfileService } from './../../core/services/profile/profile.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  profile: any;
  isSuperAdmin: boolean = false;
  constructor(private _router: Router, private _service: ProfileService) {
    this.getProfile();
  }

  ngOnInit(): void {}
  logOut() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this._router.navigate(['login']);
  }
  getProfile() {
    const id = localStorage.getItem('userID');
    if (typeof id === 'string') {
      this._service.getProfileById(id).subscribe((res) => {
        this.profile = res.data;
        this.isSuperAdmin = res.data.isSuperAdmin;
        this._service.setSuperAdmin(this.isSuperAdmin)
      });
    }
  }
  public get image() : string {
    if(this.profile && this.profile.image){
      return environment.serverUrl+this.profile.image; 
    }
    return "../../../../assets/img/profiles/tansingh-ji.jpg";
  }
}
