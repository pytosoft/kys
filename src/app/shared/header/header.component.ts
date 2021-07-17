import { ProfileService } from './../../core/services/profile/profile.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
      });
    }
  }
}
