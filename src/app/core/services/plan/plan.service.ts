import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { apiEndpointUrl } from 'src/app/config/api-endpoins';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'content-type': 'application/json'
//   })
// }

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor( private _http: HttpClient) { }

  public planGet(){
    return this._http
    .get("plan/list")
    .pipe(
      map((body: any) => body),
      catchError(() => throwError('Sorry something went wrong in api'))
    )
  }
  public planUpdate(data: any){
    return this._http
    .post("plan/update", data)
    .pipe(
      map((body: any) => body),
      catchError(() => throwError('Sorry something went wrong in api'))
    )
  }
  public planAdd(data: any){
    return this._http
    .post("plan", data)
    .pipe(
      map((body: any) => body),
      catchError(() => throwError('Sorry something went wrong in api'))
    )
  }
  deletePlan(id: string){
    return this._http
    .get("plan/deleteById?id="+id)
    .pipe(
      map((body: any) => body),
      catchError(() => throwError('Sorry something went wrong in api'))
    )
  }
}
