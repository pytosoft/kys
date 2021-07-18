import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { ProfileService } from './../../core/services/profile/profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: any;
  totalAmount: number = 0;
  currentUser: any;
  userId: string = '';
  constructor(private _service: ProfileService, private _spinner: LoaderService) { }

  ngOnInit(): void {
    const userId  = localStorage.getItem('userID');
    if (typeof userId === 'string') {
      this.userId = userId;
      this.getDashboardData(userId)
    }
  }
  getDashboardData(id: string){
    this._spinner.show();
    this._service.getDashboardById(id)
    .subscribe(res => {
      this._spinner.hide();
      this.data = res.data;
      this.currentUser = res.data.admins.filter((admin:any) => admin.isSuperAdmin === true && admin._id === this.userId)[0];
      this.data.admins = this.data.admins.filter((admin:any) => !admin.isSuperAdmin);
      this.data.admins.forEach((element: { pendingAmount: number; }) => {
        if(element.pendingAmount){
          this.totalAmount += element.pendingAmount
        }
      });
    })
}
}
