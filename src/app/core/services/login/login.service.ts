import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { apiEndpointUrl } from 'src/app/config/api-endpoins';
import { LoginRequest } from 'src/app/model/login-req';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

/**
 * @Name login
 * @purpose this is  used to  verify user
 * @param username and password
 */
public login(data: LoginRequest){
  return this._http
  .post(apiEndpointUrl.login(), data, httpOptions)
  .pipe(
    map((body: any) => body),
    catchError(() => throwError('Sorry something went wrong in api'))
  )
}

}
