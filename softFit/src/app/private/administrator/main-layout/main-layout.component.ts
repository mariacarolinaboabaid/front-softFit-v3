import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserSettingsService } from 'src/app/shared/user-settings/user-settings.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: false
})
export class MainLayoutComponent {

  sidenavDataPath: string = "../../../assets/data/nav/administrator.json";
  buttonLogout: string = "LOGOUT";
  buttonChangeLanguage: string = "LANGUAGE";
  username: string = "";
  selectedLanguage: string = "";

  constructor(
    private userSettingsService: UserSettingsService,
    private translate: TranslateService,
    private router: Router
  ) {}

   ngOnInit(){
    this.getUsername();
    this.getLanguageValueForSelect();
   };

   getUsername(){
    this.username = this.userSettingsService.getUsernameInCookies();
   };

  logout(){
    this.router.navigate(['']);
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
