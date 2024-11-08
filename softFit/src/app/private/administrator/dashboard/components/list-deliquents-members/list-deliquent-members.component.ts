import { Component } from '@angular/core';
import { DeliquentMember } from '../../dashboard.interface';
import { LoaderService } from 'src/app/loader/loader.service';
import { DashboardService } from '../../dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-deliquent-members',
  templateUrl: './list-deliquent-members.component.html',
  styleUrls: ['./list-deliquent-members.component.scss']
})
export class ListDeliquentMembersComponent {

  title: string = 'ADMIN.DASHBOARD.DELIQUENT_MEMBERS';
  listDeliquentMembers: DeliquentMember[] = [];

  constructor(
    private dashboardService: DashboardService,
    private loaderService: LoaderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadData();
  };

  navigateToMemberProfile(id: string){
    this.router.navigate([`/admin/members/${id}`])
  };

  loadData() {
    this.dashboardService.getBestRatedTrainers()
      .subscribe({
        next: response => {
          this.loaderService.showLoader();
          this.listDeliquentMembers = response;
        },
        error: err => console.error('Erro ao carregar os dados', err),
        complete: () => this.loaderService.hideLoader()
      }
    );
  };
}
