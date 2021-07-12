import { SubcriptionService } from './../../../core/services/subcription/subcription.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
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
subscriberId: string = '';

  constructor(private router: Router, private _fb: FormBuilder, private activeRoute: ActivatedRoute,
    private _service: SubcriptionService) { }
  ngOnInit() {
    this.initlization();
    this.getAllPlans();
     this.activeRoute.params.subscribe(query => {
    if(query.subsId){
      this.subscriberId = query.subsId;
    }
  })
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
      if (this.selectedProducts && this.selectedProducts.length > 0) {
          localStorage.setItem('selectedPlan', JSON.stringify(this.selectedProducts))
          this.router.navigate(['app/subscription/confirm/'+this.subscriberId]);
      } else {
        alert('Please select plan')
      }
  }

  prevPage() {
      this.router.navigate(['app/subscription/personal/'+this.subscriberId]);
  }
  getAllPlans(){
    this._service.getAllPlans()
    .subscribe(res => {
      this.products = res.data;
    })
  }
}
