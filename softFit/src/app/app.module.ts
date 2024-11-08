import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpBackend, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { AdministratorModule } from './private/administrator/administrator.module';
import { LoginComponent } from './public/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';


export function HttpLoaderFactory(httpBackend: HttpBackend) {
  return new MultiTranslateHttpLoader(httpBackend, [
    { prefix: './assets/i18n/', suffix: '.json' },
    { prefix: './assets/i18n/login/', suffix: '.json' },
    { prefix: './assets/i18n/administrator/', suffix: '.json' },
  ])
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'pt',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend]
      }
    }),
    AdministratorModule
  ],
  providers: [
    TranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
