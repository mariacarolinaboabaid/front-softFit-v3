import { Component } from '@angular/core';
import { BestRatedTrainers } from '../../dashboard.interface';
import { LoaderService } from 'src/app/loader/loader.service';
import { DashboardService } from '../../dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainers-ranking',
  templateUrl: './trainers-ranking.component.html',
  styleUrls: ['./trainers-ranking.component.scss'],
  standalone: false
})
export class TrainersRankingComponent {

  title: string = 'ADMIN.DASHBOARD.INSTRUCTOR_RANKING';
  votes: string = 'ADMIN.DASHBOARD.RATING_VOTES';
  value: string = 'ADMIN.DASHBOARD.RATING_VALUE';
  listBestRatedTrainers: BestRatedTrainers[] = [];

  constructor(
    private dashboardService: DashboardService,
    private loaderService: LoaderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadData();
  };

  navigateToTrainerProfile(id: string){
    this.router.navigate([`/admin/trainers/${id}`])
  };

  loadData() {
    this.dashboardService.getBestRatedTrainers()
      .subscribe({
        next: response => {
          this.loaderService.showLoader();
          this.listBestRatedTrainers = response;
        },
        error: err => console.error('Erro ao carregar os dados', err),
        complete: () => this.loaderService.hideLoader()
      }
    );
  };
}
