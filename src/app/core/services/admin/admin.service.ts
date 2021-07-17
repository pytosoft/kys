import { map, catchError } from 'rxjs/operators';
import { apiEndpointUrl } from 'src/app/config/api-endpoins';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs'
const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http: HttpClient) { }


  /**
 * @Name getAllAdmin
 * @purpose this is  used getAllAdmin
 * @param no
 */
public getAllAdmin(){
  return this._http
  .get(apiEndpointUrl.adminList(), httpOptions)
  .pipe(
    map((body: any) => body),
    catchError(() => throwError('Sorry something went wrong in api'))
  )
}
}
