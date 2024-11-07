import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { UserSettingsService } from 'src/app/shared/user-settings/user-settings.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationResponseSuccess, UserCredentialsForAuthentication } from './authentication.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = 'LOGIN.USERNAME';
  password: string = 'LOGIN.PASSWORD';
  forgotPassword: string = 'LOGIN.FORGOT_PASSWORD';
  buttonLogin: string = 'LOGIN.LOGIN';
  invalidCredentials: string = 'LOGIN.INVALID_CREDENTIALS';
  form!: FormGroup;
  showPassword: boolean = false;
  loginFailed: boolean = false;
  userProfile: string = 'admin';
  profiles = [
    { value: 'admin', option: 'LOGIN.ADMIN' },
    { value: 'member', option: 'LOGIN.MEMBER' },
    { value: 'trainer', option: 'LOGIN.TRAINER'}
  ];

  constructor (
    private router: Router,
    private authenticationService: AuthenticationService,
    private userSettingsService: UserSettingsService
  ){
    this.createForm();
  }

  createForm(){
    this.form = new FormGroup({
      'username': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  };

  selectProfile(value: string){
    this.userProfile = value;
  };

  changeVisibilityOfPassword() {
    this.showPassword = !this.showPassword
  };
  
  login(){
    const userCredentials: UserCredentialsForAuthentication = {
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value
    };
    if (this.userProfile === 'admin') this.authenticationAdmin(userCredentials);
  };

  authenticationAdmin(userCredentials: UserCredentialsForAuthentication){
    this.authenticationService.authenticateUserAdministrator(userCredentials)
    .subscribe({
        next: response => {
          this.setUserSettings(response);
          this.router.navigate(['admin/home'])
        }, error: err => {
          console.log(err)
          if (err.status === 404 || err.status === 401) this.loginFailed = true;
        }
      })
  };

  setUserSettings(userInformation: AuthenticationResponseSuccess){
    const username = userInformation.name;
    const accessToken = userInformation.accessToken;
    const currency = userInformation.currency;
    this.userSettingsService.setUserSettingsInCookies(username, accessToken, currency);
  };
}
