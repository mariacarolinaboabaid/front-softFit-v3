import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.develop';
import { AuthenticationResponseSuccess, UserCredentialsForAuthentication } from './authentication.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  API_URL = environment.API_URL;

  constructor(
    private httpClient: HttpClient
  ) { }


  authenticateUserAdministrator(
    userCredentials: UserCredentialsForAuthentication
  ) {
    return this.httpClient.post<AuthenticationResponseSuccess>(`${this.API_URL}/authentication/clients`, userCredentials)
  };

}
