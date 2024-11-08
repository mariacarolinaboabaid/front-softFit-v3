import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { UserSettingsService } from 'src/app/shared/user-settings/user-settings.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationResponseSuccess, UserCredentialsForAuthentication } from './authentication.interface';
import { LoaderService } from 'src/app/loader/loader.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
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
  selectedLanguage: string = '';
  profiles = [
    { value: 'admin', option: 'LOGIN.ADMIN' },
    { value: 'member', option: 'LOGIN.MEMBER' },
    { value: 'trainer', option: 'LOGIN.TRAINER'}
  ];

  constructor (
    private router: Router,
    private translate: TranslateService,
    private authenticationService: AuthenticationService,
    private userSettingsService: UserSettingsService,
    private loaderService: LoaderService
  ){
    this.createForm();
  }

  ngOnInit(){
    this.getLanguageValueForSelect();
   };

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
    this.loaderService.showLoader();
    const userCredentials: UserCredentialsForAuthentication = {
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value
    };
    if (this.userProfile === 'admin') this.authenticationAdmin(userCredentials);
    this.loaderService.hideLoader();
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

  getLanguageValueForSelect(){
    const languageInCookies = this.userSettingsService.getLanguageInCookies();
    if (!languageInCookies) this.selectedLanguage = 'pt'
    else if (languageInCookies) this.selectedLanguage = languageInCookies;
  };

  changeLanguage(event: Event) {
    const selectedLanguage = (event.target as HTMLSelectElement).value;
    this.userSettingsService.setUserSettingsLanguageInCookies(selectedLanguage);
    this.translate.use(selectedLanguage);
  };
}
