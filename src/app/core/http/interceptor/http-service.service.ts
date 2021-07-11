import { Observable } from 'rxjs';
import { Injectable, Injector, Optional, Inject, InjectionToken } from '@angular/core';
import { HttpClient, HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';
import { ApiHeaderInterceptor } from './api-header.interceptor';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { ApiPrefixInterceptor } from './api-prefix.interceptor';



/**
 * HttpInterceptorhandler
 */
class HttpInterceptorHandler implements HttpHandler {
constructor(private next: HttpHandler, private interceptor: HttpInterceptor){}
handle(_req: HttpRequest<any>): Observable<HttpEvent<any>>{
return this.interceptor.intercept(_req, this.next)
}
}
export const DYNAMAIC_INTERCEPTORS = new InjectionToken<HttpInterceptor>('DYNAMAIC_INTERCEPTORS');
@Injectable({
  providedIn: 'root'
})
export class HttpService extends HttpClient{

  constructor(private _httpHandler: HttpHandler, private _injector: Injector,
    @Optional() @Inject(DYNAMAIC_INTERCEPTORS) private interceptor: HttpInterceptor[]=[]) {
      super(_httpHandler);
      if(!this.interceptor){
        this.interceptor = [
          this._injector.get(ApiHeaderInterceptor),
          this._injector.get(ErrorHandlerInterceptor),
          this._injector.get(ApiPrefixInterceptor),
        ]
      }
     }
    request(method?: any, url?: any, options?: any): any{
      const _handler = this.interceptor.reduceRight(
        (next, interceptor) => new HttpInterceptorHandler(next, interceptor),
        this._httpHandler
      );
      return new HttpClient(_handler).request(method, url, options)
    }
}
