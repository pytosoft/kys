import { MessageService } from 'primeng/api';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { ProfileService } from './../../core/services/profile/profile.service';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'; 
import { ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  fileName= 'ExcelSheet.xlsx';
  data: any;
  totalAmount: number = 0;
  currentUser: any;
  userId: string = '';
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartLabelsPayment: Label[] = ['Deposit Amount', 'Pending Amount'];
  public pieChartData: SingleDataSet = [];
  public pieChartDataPayment: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  pieChartColor:any = [
    {
        backgroundColor: ['green','red'
        ]
    }
]
  constructor(private _service: ProfileService, private _spinner: LoaderService, 
    private messageService: MessageService) { 
    }

  ngOnInit(): void {
    const userId  = localStorage.getItem('userID');
    if (typeof userId === 'string') {
      this.userId = userId;
      this.getDashboardData(userId)
    }
  }
  exportexcel(): void 
  {
     /* table id is passed over here */   
     let element = document.getElementById('excel-table'); 
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
     XLSX.writeFile(wb, this.fileName);
    
  }

  exportexcelDeposit(): void 
  {
     /* table id is passed over here */   
     let element = document.getElementById('excel-table-deposit'); 
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
     XLSX.writeFile(wb, this.fileName);
    
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
      this.pieChartLabels = ['Active Subscribers', 'In Active Subscribers']
      this.pieChartData = [this.data.activeSubsCount, (this.data.subsCount - this.data.activeSubsCount)];
      this.pieChartDataPayment = [this.currentUser.depositAmount, this.totalAmount];
      monkeyPatchChartJsTooltip();
      monkeyPatchChartJsLegend();
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
