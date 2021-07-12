import { apiEndpointUrl } from './../../../config/api-endpoins';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcriptionService {

  constructor(private _http: HttpClient) { }

  /**
 * @Name login
 * @purpose this is  used to  verify user
 * @param username and password
 */
public saveSubscriber(data: any){
  return this._http
  .post(apiEndpointUrl.subcriber(), data)
  .pipe(
    map((body: any) => body),
    catchError(() => throwError('Sorry something went wrong in api'))
  )
}
  /**
 * @Name plans
 * @purpose this is  used to  verify user
 * @param username and password
 */
   public getAllPlans(){
    return this._http
    .get(apiEndpointUrl.plans())
    .pipe(
      map((body: any) => body),
      catchError(() => throwError('Sorry something went wrong in api'))
    )
  }
  getSubcriberInfoById(id: string){
    return this._http
    .get(apiEndpointUrl.subscriberById(id))
    .pipe(
      map((body: any) => body),
      catchError(() => throwError('Sorry something went wrong in api'))
    )
  }
  saveSubcription(data: any){
    return this._http
    .post(apiEndpointUrl.saveSubcription(), data)
    .pipe(
      map((body: any) => body),
      catchError(() => throwError('Sorry something went wrong in api'))
    )
  }
}
