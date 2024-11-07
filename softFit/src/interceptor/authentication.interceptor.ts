import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UserSettingsService } from 'src/app/shared/user-settings/user-settings.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(
    private userSettingsService: UserSettingsService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.userSettingsService.getAccessTokenInCookies();

    if (accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.userSettingsService.deleteUserSettingsInCookies();
          setTimeout(() => { this.router.navigate(['']) }, 1000);
        }
        return throwError(() => error);
      })
    );
  }
}

