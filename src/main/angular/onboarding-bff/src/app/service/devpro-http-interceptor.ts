import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";

@Injectable()
export class DevproHttpInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //console.log("DevproHttpInterceptor.request->", request);
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
           let errorMsg = '';
           if (error && error.error && error.error instanceof ErrorEvent) {
             // error from client
             errorMsg = `[Client Error] ${error.error.message}`;
           } else {
             // error from server
             errorMsg = `[Server Error] StatusCode: ${error.status} - Message: ${error.message}`;
           }
           return throwError(errorMsg);
          })
      );
  }
}
