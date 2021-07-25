import { BookServiceService } from './../books/book.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { Component, OnInit } from '@angular/core';
import { PlanDetail } from '../../model/plans';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { PlanService } from 'src/app/core/services/plan/plan.service';

@Component({
  selector: 'app-plains',
  templateUrl: './plains.component.html',
  styleUrls: ['./plains.component.scss'],
})
export class PlainsComponent implements OnInit {
  planDetails: PlanDetail[] = [];
  plan: any;
  plans: any;
  submitted?: boolean;
  statuses?: any[];
  planDialog?: boolean;
  selectedPlans: any;
  books: any[] = [];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _service: PlanService,
    private _spinner: LoaderService,
    private _bookservice: BookServiceService
  ) {
    this.getAllBooks();
  }

  ngOnInit(): void {
    this.planGet();
  }

  planGet() {
    this._spinner.show();
    this._service.planGet().subscribe((user) => {
      this.planDetails = user.data;
      this.plans = user.data;
      this._spinner.hide();
    });
  }
  getAllBooks() {
    this._bookservice.getBookList().subscribe((user) => {
      this.books = user.data;
      this._spinner.hide();
    });
  }

  addPlan() {
    this.plan = {};
    this.submitted = false;
    this.planDialog = true;
  }

  editPlan(plan: any) {
    this.plan = { ...plan };
    this.planDialog = true;
  }

  deletePlan(plan: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + plan.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this._service.deletePlan(plan._id).subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: res.message,
            life: 3000,
          });
          this.planGet();
        });
      },
    });
  }

  hideDialog() {
    this.planDialog = false;
    this.submitted = false;
  }

  savePlan() {
    this.submitted = true;
    if(this.plan.name == undefined || this.plan.price == undefined || this.plan.duration == undefined || this.plan.books == undefined){
      return
    }

    else if (this.plan && this.plan._id) {
      this._spinner.show();
      this._service.planUpdate(this.plan).subscribe((res) => {
        this.planDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: res.message,
          life: 3000,
        });
      });
      this.planGet();
    } else {
      this._spinner.show();
      this._service.planAdd(this.plan).subscribe((res) => {
        this.planDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: res.message,
          life: 3000,
        });
        this.planGet();
      });
    }
    this.planDialog = false;
    this.plan = {};
  }
  filterByName(val: string){
    if(val){
      this.planDetails = this.plans.filter(function (e: { name: string | string[]; }) {
        return e.name.includes(val);
       })
    } else{
      this.planDetails = this.plans;
    }

  }
  updateBook(value: any){
    const bookPrice = this.books.filter(res => res.bookName === this.plan.books)
    this.plan.price = bookPrice[0].pricing*this.plan.duration
  }
}
