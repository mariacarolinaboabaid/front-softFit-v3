import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  sidenavDataPath: string = "../../../assets/data/nav/administrator.json";
  logout: string = "LOGOUT";

}
