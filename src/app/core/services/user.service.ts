import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { apiEndpointUrl } from 'src/app/config/api-endpoins';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private _http: HttpClient ) { }

  public UserGet(){
    return this._http
    .get("subscriber/list")
    .pipe(
      map((body: any) => body),
      catchError(() => throwError('Sorry something went wrong in api'))
    )
  }

  public UserPost(data:any){
    return this._http
    .post("subscriber", data, httpOptions)
    .pipe(
      map((body: any) => body),
      catchError(() => throwError('Sorry something went wrong in api'))
    )
  }

  public UserUpdate(data:any){
    return this._http
    .post("subscriber/update", data, httpOptions)
    .pipe(
      map((body: any) => body),
      catchError(() => throwError('Sorry something went wrong in api'))
    )
  }


}
