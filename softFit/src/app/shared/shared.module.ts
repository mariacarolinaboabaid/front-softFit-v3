import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@NgModule({
  declarations: [
    SidenavComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule
  ],
  providers: [
    TranslateService
  ],
  exports: [
    SidenavComponent,
  ]
})
export class SharedModule { }
