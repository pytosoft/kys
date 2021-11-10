import { map, catchError } from 'rxjs/operators';
import { apiEndpointUrl } from 'src/app/config/api-endpoins';
import { HttpService } from './../../http/interceptor/http-service.service';
import { Injectable } from '@angular/core';
import { Subject, Subscription, throwError } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public isSuperAdmin = new Subject<boolean>();
  constructor(private _http: HttpService) { }

    /**
 * @Name getProfileById
 * @purpose this is  used getProfileById
 * @param no
 */
public getProfileById(id: string){
  return this._http
  .get(apiEndpointUrl.getProfileId(id))
  .pipe(
    map((body: any) => body),
    catchError(() => throwError('Sorry something went wrong in api'))
  )
}

    /**
 * @Name getProfileById
 * @purpose this is  used getProfileById
 * @param no
 */
     public getDashboardById(id: string){
      return this._http
      .get(apiEndpointUrl.getDashboardId(id))
      .pipe(
        map((body: any) => body),
        catchError(() => throwError('Sorry something went wrong in api'))
      )
    }
    depositAmountRequest(data: any){
      return this._http
      .post(apiEndpointUrl.depositAmountRequest(), data)
      .pipe(
        map((body: any) => body),
        catchError(() => throwError('Sorry something went wrong in api'))
      )
    }
    uploadPic(data: any){
      return this._http
      .post(apiEndpointUrl.uploadPic(), data)
      .pipe(
        map((body: any) => body),
        catchError(() => throwError('Sorry something went wrong in api'))
      )
    }
    uploadFile(data: any){
      return this._http
      .post(apiEndpointUrl.uploadSubscriber(), data)
      .pipe(
        map((body: any) => body),
        catchError(() => throwError('Sorry something went wrong in api'))
      )
    }
    verifyAmount(data: any){
      return this._http
      .post(apiEndpointUrl.verifyAmount(), data)
      .pipe(
        map((body: any) => body),
        catchError(() => throwError('Sorry something went wrong in api'))
      )
    }
    changePassword(data: any){
      return this._http
      .post(apiEndpointUrl.changePassword(), data)
      .pipe(
        map((body: any) => body),
        catchError(() => throwError('Sorry something went wrong in api'))
      )
    }
    setSuperAdmin(val: boolean){
      this.isSuperAdmin.next(val)
    }
}
