import { map, catchError } from 'rxjs/operators';
import { apiEndpointUrl } from 'src/app/config/api-endpoins';
import { HttpService } from './../../http/interceptor/http-service.service';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

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
}
