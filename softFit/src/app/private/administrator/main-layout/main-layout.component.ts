import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserSettingsService } from 'src/app/shared/user-settings/user-settings.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  sidenavDataPath: string = "../../../assets/data/nav/administrator.json";
  buttonLogout: string = "LOGOUT";
  buttonChangeLanguage: string = "LANGUAGE";
  username: string = "";

  constructor(
    private userSettingsService: UserSettingsService,
    private translate: TranslateService
  ) {
      this.translate.setDefaultLang('pt');
   }

   ngOnInit(){
    this.getUsername();
   };

   getUsername(){
    this.userSettingsService.setUsername();
    this.username = this.userSettingsService.getUsername();
   };

  logout(){}

  changeLanguage(event: Event) {
    const selectedLanguage = (event.target as HTMLSelectElement).value;
    this.translate.use(selectedLanguage);
  };

}
