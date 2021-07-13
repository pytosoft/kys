import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { apiEndpointUrl } from 'src/app/config/api-endpoins';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor( private _http: HttpClient) { }
  
  public PlanGet(){
    return this._http
    .get("plan/list")
    .pipe(
      map((body: any) => body),
      catchError(() => throwError('Sorry something went wrong in api'))
    )
  }
}
