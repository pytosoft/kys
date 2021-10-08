import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { LoaderService } from '../../../core/services/loader/loader.service';
import { BookServiceService } from '../book.service';
import{BooksDetail,BooksDetails} from 'src/app/model/books'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  booksDetail: any;

  productDialog?: boolean;

  products: any;

  product: any;

  selectedProducts: any;

  submitted?: boolean;
  editMode: boolean = false;

  statuses?: any[];
  bookForm!: FormGroup;
  PostBook: any;
  selectedFile: any;
  id: string = '';
  books: any[] = [];
  serverUrl = environment.serverUrl;
  constructor(
    private _Loader: LoaderService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private BooksService: BookServiceService,
    private _confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getData();
    this.addbookForm();
  }
  /********************************
   * Form :This is Books form
   * @purpose : this is used to add books
   *******************************/

  addbookForm() {
    this.bookForm = this.fb.group({
      bookName: ['', Validators.required],
      pricing: ['', Validators.required],
      bookDetails: ['', Validators.required],
      category: ['', Validators.required],
      attachment: ['', Validators.required],
      createDate: ['', Validators.required],
      updateDate: ['', Validators.required],
    });
  }

  bookDataAdd() {
    this.editMode = false;
    this.productDialog = true;
  }
/********************************
   * New Books  name
   * @param ,bookName,pricing,category
   * @purpose : this is used for add new books
   *******************************/
  addNewBook() {
    this.submitted = true;
    let reqData : BooksDetail = new BooksDetails();
    if(reqData.bookName == '' || reqData.pricing == 0 || reqData.category == ''){
      return
    }
    else if (this.editMode) {
      const fd = new FormData();
      fd.append('bookName', this.bookForm.value.bookName);
      fd.append('pricing', this.bookForm.value.pricing);
      fd.append('category', this.bookForm.value.category);
      fd.append('attachment', this.selectedFile);
      fd.append('_id', this.id);
      this.BooksService.updateBook(fd).subscribe((arg) => {
        this.productDialog = false;
        this.selectedFile = null;
        this.getData();
      });
    } else {
      const fd = new FormData();
      fd.append('bookName', this.bookForm.value.bookName);
      fd.append('pricing', this.bookForm.value.pricing);
      fd.append('category', this.bookForm.value.category);
      fd.append('attachment', this.selectedFile);
      this.BooksService.bookPost(fd).subscribe((res) => {
        this.productDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: res.message,
          life: 3000,
        });
        this.selectedFile = null;
        this.getData();
      });
    }
  }
  onFileSelected(event: any) {
    this.selectedFile = event?.target.files[0];
  }
  openNew() {
    this.bookForm.reset();
    this.submitted = false;
    this.productDialog = true;
    this.editMode = false;
  }
  getData() {
    this._Loader.show();
    this.BooksService.getBookList().subscribe((book) => {
      this.booksDetail = book.data;
      this.books = book.data;
      this._Loader.hide();
    });
  }

  deleteBook(book: any) {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete the selected book?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.BooksService.bookDelete(book._id).subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: res.message,
            life: 3000,
          });
          this.getData();
        });
      },
    });
  }

  editBook(data: any) {
    this.editMode = true;
    this.productDialog = true;
    this.bookForm.patchValue(data);
    this.id = data._id;
  }

  deleteProduct(product: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete book?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(
          (val: any) => val.id !== product.id
        );
        this.product = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }
  filterByName(val: string) {
    if (val) {
      this.booksDetail = this.books.filter(function (e: {
        name: string | string[];
      }) {
        return e.name.includes(val);
      });
    } else {
      this.booksDetail = this.books;
    }
  }

  public get bookName() : any {
    return this.bookForm.get('bookName')
  }
  public get pricing() : any {
    return this.bookForm.get('pricing');
  }
  public get category() : any {
    return this.bookForm.get('category');
  }

}
