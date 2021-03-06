import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { apiEndpointUrl } from 'src/app/config/api-endpoins';
import { subscriberDetail } from 'src/app/model/user';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class subscriberService {

  constructor( private _http: HttpClient ) { }

  public subscriberGet(reqData: any){
    return this._http
    .post(`subscriber/search`, reqData)
    .pipe(
      map((body: any) => body),
      catchError(() => throwError('Sorry something went wrong in api'))
    )
  }

  public subscriberPost(data:any){
    return this._http
    .post("subscriber", data, httpOptions)
    .pipe(
      map((body: any) => body),
      catchError(() => throwError('Sorry something went wrong in api'))
    )
  }

  public subscriberUpdate(data:any){
    return this._http
    .post("subscriber/update", data, httpOptions)
    .pipe(
      map((body: any) => body),
      catchError(() => throwError('Sorry something went wrong in api'))
    )
  }
  getSubcriberprofileById(id: string){
    return this._http
    .get(`subscriber/getUserProfile/${id}`)
    .pipe(
      map((body: any) => body),
      catchError(() => throwError('Sorry something went wrong in api'))
    )
  }
// this is post api  of subscriber
postSubscriber(data:any){
  return this._http
  .post(`subscriber/getUserProfile/`,data,httpOptions )
  .pipe(
    map((body: any) => body),
    catchError(() => throwError('Sorry something went wrong in api'))
  )
}
deactivateSubcription(data:any){
  return this._http
  .post(apiEndpointUrl.deactivateSubcription(),data,httpOptions )
  .pipe(
    map((body: any) => body),
    catchError(() => throwError('Sorry something went wrong in api'))
  )
}
  public profileGet(id:any) {
    return this._http.get(apiEndpointUrl.profile(id)).pipe(
      map((body: any) => body),
      catchError(() => throwError('Sorry something went wrong in api'))
    )
  }
 public getState(){
    return this._http.get(apiEndpointUrl.getStateList()).pipe(
      map((body:any)=>body),
      catchError(()=>throwError('sorry something went wth the api'))
    )

  }
  public getDistrict(data:string){
    return this._http.get(apiEndpointUrl.getDistList(data)).pipe(
      map((body:any)=>body),
      catchError(()=>throwError('sorry something went wrong with the api'))
    )

  }
  

}
