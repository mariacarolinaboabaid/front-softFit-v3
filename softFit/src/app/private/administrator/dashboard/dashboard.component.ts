import { Component } from '@angular/core';
import { UserSettingsService } from 'src/app/shared/user-settings/user-settings.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false
})
export class DashboardComponent {

  welcome: string = "WELCOME";
  username: string = "";

  constructor(
    private userSettingsService: UserSettingsService
  ) {}

  ngOnInit(){
    this.getUsername();
   }

   getUsername(){
    this.username = this.userSettingsService.getUsernameInCookies();
   };
}
