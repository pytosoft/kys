import { SubcriptionService } from './../../../core/services/subcription/subcription.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  planForm!: FormGroup;
  products: any[] = [];
  selectedProducts: any[] = [];


  constructor(private router: Router, private _fb: FormBuilder,
    private _service: SubcriptionService) { }
  ngOnInit() {
    this.initlization();
    this.getAllPlans();
  }
  initlization(): void{
    this.planForm = this._fb.group({
      name: [ '', Validators.required],
      mobile: ['', Validators.required],
      email: [''],
      fatherName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pinCode: [0, Validators.required]
    })
  }
  nextPage() {
      // if (this.seatInformation.class && this.seatInformation.seat && this.seatInformation.wagon) {
          // this.ticketService.ticketInformation.seatInformation = this.seatInformation;
          this.router.navigate(['app/subscription/confirm']);
      // }
  }

  prevPage() {
      this.router.navigate(['app/subscription/personal']);
  }
  getAllPlans(){
    this._service.getAllPlans()
    .subscribe(res => {
      this.products = res.data;
    })
  }
}
