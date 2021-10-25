import { map, catchError } from 'rxjs/operators';
import { apiEndpointUrl } from 'src/app/config/api-endpoins';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, throwError } from 'rxjs'
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
getDropDownData(): Observable<any> {
  const response1 = this._http.get(apiEndpointUrl.adminNameList());
  const response2 = this._http.get(apiEndpointUrl.getStateList());
  const response3 = this._http.get(apiEndpointUrl.getPlanList());
  return forkJoin([response1, response2, response3]);
}
public getAllAdminNames(){
  return this._http
  .get(apiEndpointUrl.adminNameList(), httpOptions)
  .pipe(
    map((body: any) => body),
    catchError(() => throwError('Sorry something went wrong in api'))
  )
}
saveAdmin(data: any){
  return this._http
  .post("user",data, httpOptions)
  .pipe(
    map((body: any) => body),
    catchError(() => throwError('Sorry something went wrong in api'))
  )
}
deleteAdmin(admin: any){
  return this._http
  .get(apiEndpointUrl.deleteAdmin(admin), httpOptions)
  .pipe(
    map((body: any) => body),
    catchError(() => throwError('Sorry something went wrong in api'))
  )
}

editAdmin(data: any){
  return this._http
  .post(apiEndpointUrl.editAdmin(),data, httpOptions)
  .pipe(
    map((body: any) => body),
    catchError(() => throwError('Sorry something went wrong in api'))
  )
}
}
