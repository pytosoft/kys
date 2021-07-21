import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';
import { Observable ,throwError } from 'rxjs';
import { apiEndpointUrl } from 'src/app/config/api-endpoins';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  constructor(private _http: HttpClient) { }
  //this is  book get api
  public getBookList(){
    return this._http
    .get(apiEndpointUrl.books())
    .pipe(
      map((body: any) => body),
      catchError(() => throwError('Sorry something went wrong in api'))
    )
  }
//this is book post api
  public bookPost(data:any){
    return this._http
    .post(apiEndpointUrl.bookPost(), data)
    .pipe(
      map((body: any) => body),
      catchError(() => throwError('Sorry something went wrong in api'))
    )
  }
//this is book delete  api

public bookDelete(id:any){
  return this._http
  // .get('book/deleteById?id='+id,httpOptions)
  .get(apiEndpointUrl.bookDelete() + id,httpOptions)
  .pipe(
    map((body:any)=> body),
    catchError(()=> throwError('Sorry something went wrong in api'))
  )
}
 updateBook(data:any){
  return this._http
  .post(apiEndpointUrl.updateBook(), data)
  .pipe(
    map((body:any)=>body),
    catchError(()=>throwError('Sorry something went wrong in api'))
  )
}




}
function data(arg0: string, data: any) {
  throw new Error('Function not implemented.');
}

