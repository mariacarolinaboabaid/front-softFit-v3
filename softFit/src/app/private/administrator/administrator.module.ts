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
import { TrainersRankingComponent } from './dashboard/components/trainers-ranking/trainers-ranking.component';
import { ListDeliquentMembersComponent } from './dashboard/components/list-deliquents-members/list-deliquent-members.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainLayoutComponent,
    DashboardComponent,
    CardsComponent,
    TrainersRankingComponent,
    ListDeliquentMembersComponent,
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    SharedModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
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
