import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest, HttpInterceptor} from '@angular/common/http';
import 'rxjs/add/observable/fromPromise';
import {Observable} from 'rxjs/Observable';
import {UserContextService} from './shared/user-context.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  constructor(public userContextService: UserContextService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercepted')
    req = req.clone({
      setHeaders: {Authorization: `Bearer ${this.userContextService.token}`},
    });
    return next.handle(req);
  }
}
