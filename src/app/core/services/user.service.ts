import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { apiEndpointUrl } from 'src/app/config/api-endpoins';

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
}
