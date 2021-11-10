import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../../services/loader/loader.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private _loader: LoaderService,
    private messageService: MessageService,
    private _router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next
      .handle(request)
      .pipe(catchError((error) => this.customErrorHandler(error)));
  }

  /**
   * customErrorHandler
   */
  private customErrorHandler( res: HttpErrorResponse): Observable<HttpEvent<any>> {
    this._loader.hide();
    this.messageService.clear();
    if (res.status === 404) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: res.error.message,
      });
    } else if (res.status === 401) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: res.error.message ? res.error.message : 'Session Expired. Please login again'
      });
      localStorage.removeItem('token');
      localStorage.removeItem('userID');
      this._router.navigate(['/login']);
    } else if (res.status === 500) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: res.error.message
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: res.error.message
      });
    }
    throw res;
  }
}
