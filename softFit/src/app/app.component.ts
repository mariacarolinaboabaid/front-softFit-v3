import { Component } from '@angular/core';
import { LoaderService } from './loader/loader.service';
import { UserSettingsService } from './shared/user-settings/user-settings.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {

  title = 'SoftFit';
  showLoader: boolean = false;

  constructor(
    private loaderService: LoaderService,
    private userSettingsService: UserSettingsService,
    private translate: TranslateService
  ){}

  ngOnInit(){
    this.listenToLoaderObservable();
    this.getDefaultLanguage();
  };

  getDefaultLanguage(){
    const languageInCookies = this.userSettingsService.getLanguageInCookies();
    if (!languageInCookies) this.translate.setDefaultLang('pt');
    else if (languageInCookies) this.translate.setDefaultLang(languageInCookies);
  };

  listenToLoaderObservable(){
    this.loaderService.isLoaderVisible$.subscribe({
      next: response => this.showLoader = response,
      error: error => console.log("Error loader: ", error)
    })
  };
}
