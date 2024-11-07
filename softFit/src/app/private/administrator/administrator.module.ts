import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardsComponent } from './dashboard/components/cards/cards.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from 'src/interceptor/authentication.interceptor';


@NgModule({
  declarations: [
    MainLayoutComponent,
    DashboardComponent,
    CardsComponent,
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    SharedModule,
    TranslateModule
  ],
  providers: [
    TranslateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true 
    }
  ]
})
export class AdministratorModule { }
