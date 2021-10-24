export interface BooksDetail{
    _id: any;
    bookName: string,
   pricing: number,
  bookDetails: string,
  category: string,
  attachment: string,
  createDate: Number,
  updateDate: number
}
export class BooksDetails implements BooksDetail{
  _id:any;
  bookName:string="";
  pricing:number=0;
  category:string="";
  attachment:string=""
  createDate:Number=0;
  updateDate:number=0;
  bookDetails:string="";
  

}



 



  
