import { MessageService } from 'primeng/api';
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
  constructor(private _service: ProfileService, private _spinner: LoaderService, 
    private messageService: MessageService) { }

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
      if(res.data.admins){
        this.currentUser = res.data.admins.filter((admin:any) => admin.isSuperAdmin === true && admin._id === this.userId)[0];
        this.data.admins = this.data.admins.filter((admin:any) => !admin.isSuperAdmin);
        this.data.admins.forEach((element: { pendingAmount: number; }) => {
          if(element.pendingAmount){
            this.totalAmount += element.pendingAmount
          }
        });
      }
    })
}
verify(item: any){
  this._spinner.show();
  item.adminId = localStorage.getItem('userID');
  this._service.verifyAmount(item)
  .subscribe(res => {
    this._spinner.hide();
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: res.message,
      life: 3000,
    });
    this.currentUser.depositAmountRequest.forEach((element: { id: any; isVerifyed: boolean; }) => {
      if(element.id === item.id){
        element.isVerifyed = true;
      }
    });
  })
}
}
