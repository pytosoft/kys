import { map, catchError } from 'rxjs/operators';
import { apiEndpointUrl } from 'src/app/config/api-endpoins';
import { Subject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  userType: string | undefined;
  public userDetails = new Subject<any>();
  constructor(private _http: HttpClient) { }
  public get userId() : string {
    let id = localStorage.getItem('userID');
    return id ? id : '';
  }
  public  setUserInfo(v : any) {
   this.userDetails.next(v)
  }
  public setUserImage(url: string){
    localStorage.setItem('userImage', url)
  }
  userInfo(): Observable<any> {
    return this.userDetails.asObservable();
}



}
