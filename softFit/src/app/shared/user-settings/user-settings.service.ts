import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  username: string = "Maria Carolina";

  constructor (
    private cookieService: CookieService
  ) { }

  setUsername() {
    this.cookieService.set('username', this.username);
  };

  getUsername() {
    return this.cookieService.get('username');
  };

  deleteUsername() {
    this.cookieService.delete('cookieName');
  };
}
