import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  username: string = "";
  accessToken: string = "";
  currency: string = "";
  expirationTime = 24 * 60 * 60;
  language: string = "";

  constructor(
    private cookieService: CookieService
  ) { }

  setUserSettingsInCookies(
    username: string,
    accessToken: string,
    currency: string
  ) {
    this.cookieService.set('username', username, this.expirationTime, '/');
    this.cookieService.set('accessToken', accessToken, this.expirationTime, '/');
    this.cookieService.set('currency', currency, this.expirationTime, '/');
    this.cookieService.set('currency', currency, this.expirationTime, '/');
  };

  setUserSettingsLanguageInCookies(language: string){
    this.cookieService.set('language', language, this.expirationTime);
  }

  getUsernameInCookies() {
    return this.cookieService.get('username');
  };

  getAccessTokenInCookies() {
    return this.cookieService.get('accessToken');
  };

  getLanguageInCookies(){
    return this.cookieService.get('language');
  };

  deleteUserSettingsInCookies() {
    this.cookieService.delete('username');
    this.cookieService.delete('accessToken');
    this.cookieService.delete('accessToken');
  };
}
