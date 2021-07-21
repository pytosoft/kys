import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoaderService } from '../../../core/services/loader/loader.service';
import { BookServiceService } from '../book.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
    booksDetail:any

  productDialog?: boolean;

  products: any;

  product: any;

  selectedProducts:any

  submitted?: boolean;
  editMode: boolean = false;
  

  statuses?: any[];
  bookForm!: FormGroup;
 PostBook:any;
 selectedFile: any;
 id: string = '';


  constructor( private _Loader: LoaderService,
     private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private BooksService:BookServiceService,
       private _confirmationService: ConfirmationService, 
      private fb: FormBuilder,
      ) { }

  ngOnInit() {


      // this.productService.getProducts().then(data => this.products = data);
      this.getData();
      this.addbookForm();
    
  }

  addbookForm() {
    this.bookForm = this.fb.group({
      bookName: ['', Validators.required],
      pricing: ['', Validators.required],
      bookDetails: ['', Validators.required],
      category: ['', Validators.required],
      attachment: ['', Validators.required],
      createDate: ['', Validators.required],
      updateDate: ['', Validators.required],
    })
  }

  
  bookDataAdd() {
    console.log("post api yogi"+this.bookForm.value)
    this.editMode = false;
  this.productDialog = true;
  }



//   if (this.plan && this.plan._id) {
//     this._service.planUpdate(this.plan).subscribe((res) => {
//       this.planDialog = false;
//       this.messageService.add({
//         severity: 'success',
//         summary: 'Successful',
//         detail: res.message,
//         life: 3000,
//       });
//     });
//     this.planGet();
//   } else {
//     this._service.planAdd(this.plan).subscribe((res) => {
//       this.planDialog = false;
//       this.messageService.add({
//         severity: 'success',
//         summary: 'Successful',
//         detail: res.message,
//         life: 3000,
//       });
//       this.planGet();
//     });
//   }
//   this.planDialog = false;
//   this.plan = {};
// }

  bookPost() {
     
    if (this.editMode) {
        let reqData = this.bookForm.value;
        reqData._id = this.id;
        this.BooksService.updateBook(reqData).subscribe(arg=>{
            this.productDialog = false
            this.getData()
        })
          
  
   

}
   else {

    const  fd =  new FormData();
    fd.append('bookName', this.bookForm.value.bookName);
    fd.append('pricing', this.bookForm.value.pricing);
    fd.append('bookDetails', this.bookForm.value.bookDetails);
    fd.append('category', this.bookForm.value.category);
    fd.append('attachment', this.selectedFile);
    fd.append('createDate', this.bookForm.value.createDate);
    fd.append('updateDate', this.bookForm.value.updateDate);

   this.BooksService.bookPost(fd).subscribe(res => {
    this.productDialog = false
       console.log(this.getData())
       this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: res.message,
                life: 3000,
              });
             
              this.getData()
   })

}
  }

//   const reqData = {
//     "bookname" : this.bookForm.value.bookname,
//     "pricing" : this.bookForm.value.pricing,
//     "bookDetails":this.bookForm.value.bookDetails,
//     "category" : this.bookForm.value.category,
//     "attachment" : this.bookForm.value.attachment,
//     "createDate" : this.bookForm.value.createDate,
//     "updateDate" : this.bookForm.value.updateDate
//   }

onFileSelected(event:any){
this.selectedFile = event?.target.files[0];

}





  openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
  }
  getData() {

    this.BooksService.getBookList().subscribe(book => {
      this.booksDetail = book.data
      console.log(this.booksDetail)
 
    });


  }



//this is book delete  

deleteSelectedProducts(book:any) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected products' + book.name+ '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
       
          accept: () => {
            //   this.products = this.products.filter((val:any) => !this.selectedProducts.includes(val));
            //   this.selectedProducts = null;
            // const id = this.booksDetail[i]._id;
                  this.BooksService.bookDelete(book._id).subscribe((res)=>{
                      this.messageService.add({
                    
                          severity:'success',
                          summary:'Successful',
                          detail:res.message,
                          life:3000,

                      })
                      this.getData()

                  }
                  )
        
          }
        
      });
  }
//thhis is update 
editBook(data:any){
    this.editMode = true;
    this.productDialog = true;
    this.bookForm.patchValue(data); 
    this.id = data._id;
}




// updateBookData(id:any){
  

//     this.BooksService.updateBook(id).subscribe(arg=>{
//         this.productDialog = false
//         this.hideDialog
//         this.getData();
//         //  this.booksDetail[i]._id;

    
//     }
//     )
// }






//   editProduct(product: any) {
//       this.product = {...product};
//       this.productDialog = true;
//   }

  deleteProduct(product: any) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + product.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.products = this.products.filter((val:any) => val.id !== product.id);
              this.product = {};
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
          }
      });
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }
  
  saveProduct() {
      this.submitted = true;

      if (this.product.name.trim()) {
          if (this.product.id) {
              this.products[this.findIndexById(this.product.id)] = this.product;                
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
          }
          else {
              this.product.id = this.createId();
              this.product.image = 'product-placeholder.svg';
              this.products.push(this.product);
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
          }

          this.products = [...this.products];
          this.productDialog = false;
          this.product = {};
      }
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

function id(arg0: string, id: any) {
    throw new Error('Function not implemented.');
}

