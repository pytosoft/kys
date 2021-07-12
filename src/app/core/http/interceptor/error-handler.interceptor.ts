import {MessageService} from 'primeng/api';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../../services/loader/loader.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private _loader: LoaderService, private messageService: MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(error => this.customErrorHandler(error)));
  }

  /**
   * customErrorHandler
   */
  private customErrorHandler(_res: HttpEvent<any>): Observable<HttpEvent<any>>{
    this._loader.hide();
    const status = _res.type;

    if(status === 404){
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      key: 'myToast',
      detail:  "Resource not found"
    });
    }
    //  else{
    //   if(!(status instanceof Blob)){
    //   this.messageService.add({
    //     severity: 'error',
    //     summary: 'Error',
    //     key: 'myToast',
    //     detail: _res['error']
    //   });
    //       }
    // }
    throw _res;
  }
}
