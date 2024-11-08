import { Component, Input } from '@angular/core';
import { Link } from './sidenav.interface';
import { SidenavService } from './sidenav.service';
import { NavigationEnd, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  standalone: false
})
export class SidenavComponent {

  @Input() dataPath: string = "";
  links: Link[] = [];
  currentRoute: string = "";
  routerEventsSubscription!: Subscription;
  
  constructor (
    private sidenavService: SidenavService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadData();
    this.currentRoute = window.location.pathname;
    console.log(this.currentRoute)
    this.subscriptionRouterEvents();
  };

  ngOnDestroy(){
    this.unsubscribeRouterEvents();
  }

  loadData() {
    this.sidenavService.getSidenavData(this.dataPath)
      .subscribe({
        next: response => {
          this.links = response.links;
        },
        error: error => {
          console.log(error)
        }
      })
  };

  navigateToLink(route: string) {
    this.router.navigate([`admin/${route}`])
  };

  navLinkIsActive(route: string){
    return this.currentRoute.includes(route)
  };

  subscriptionRouterEvents(){
    this.routerEventsSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects
      }
    });
  };

  unsubscribeRouterEvents(){
    if (this.routerEventsSubscription) 
      this.routerEventsSubscription.unsubscribe();
  };

}
