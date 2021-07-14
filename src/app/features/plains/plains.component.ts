import { Component, OnInit } from '@angular/core';
import { PlanDetail } from '../../model/plans'
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { PlanService } from 'src/app/core/services/plan/plan.service';

@Component({
  selector: 'app-plains',
  templateUrl: './plains.component.html',
  styleUrls: ['./plains.component.scss']
})
export class PlainsComponent implements OnInit {
  PlanDetails: PlanDetail[] = []
  product:any;
  products:any;
  submitted?: boolean;
  statuses?: any[];
  productDialog?: boolean;
  selectedProducts:any

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
    private PlanService:PlanService) { }

  ngOnInit(): void {
    this.planGet(); 
    this.planUpdate();
    this.planAdd()

    this.statuses = [
      {label: 'INSTOCK', value: 'instock'},
      {label: 'LOWSTOCK', value: 'lowstock'},
      {label: 'OUTOFSTOCK', value: 'outofstock'}
  ];
  }


  planGet() {
    debugger
    this.PlanService.planGet().subscribe(user =>{
    console.log(user.data)
    this.PlanDetails  = user.data
    })

  }
  planUpdate() {
    debugger
    this.PlanService.planGet().subscribe(user =>{
    console.log(user.data)
    this.planGet();
    })

  }
  planAdd() {
    debugger

//    const addData = {

// "planId" : this.product.value.planId,
// "name" : this.product.value.name,
// "createdBy" : this.product.value.createdBy,
// "price" : this.product.value.price,
// "duration" : this.product.value.duration,
// "description" : this.product.value.description,
// "active" : this.product.value.active

//    }
   this.PlanService.planGet().subscribe(arg => {
     console.log(this.planGet())
     this.planGet();
   });
   
 

  }

  addPlan(product:any) {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
}

deleteSelectedProducts() {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.products = this.products.filter((val:any) => !this.selectedProducts.includes(val));
          this.selectedProducts = null;
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      }
  });
}


editPlan(product: any) {
  this.product = {...product};
  this.productDialog = true;
}

deleteProduct(product: any) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',

      // accept: () => {
      //     this.products = this.products.filter(val => val.id !== product.id);
      //     this.product = {};
      //     this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      // }
  });
}




hideDialog() {
  this.productDialog = false;
  this.submitted = false;
}

saveProduct() {
  
  this.submitted = true;

  // if (this.product.name.trim()) {
  //     if (this.product.id) {
  //         this.products[this.findIndexById(this.product.id)] = this.product;                
  //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
  //     }
  //     else {
  //         this.product.id = this.createId();
  //         this.product.image = 'product-placeholder.svg';
  //         this.products.push(this.product);
  //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
  //     }
if(this.product && this.product._id){

  this.PlanService.planUpdate(this.product)
  .subscribe(res => {
    
    this.productDialog =  false
    alert('updated')
  })
  
}
else{
  this.PlanService.planAdd(this.product)
  .subscribe(res => {
    this.productDialog =  false
    alert('updated')
  })
}
      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}

createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}
  }


