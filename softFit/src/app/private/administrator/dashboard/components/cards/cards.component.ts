import { Component } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { Card } from './card.interface';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  standalone: false
})
export class CardsComponent {

  cards: Card[] = [
    {
      key: 'totalCustomers',
      value: 0,
      legend: 'ADMIN.DASHBOARD.TOTAL_CUSTOMERS'
    },
    {
      key: 'totalDeliquentCustomers',
      value: 0,
      legend: 'ADMIN.DASHBOARD.TOTAL_DELIQUENT_CUSTOMERS'
    },
    {
      key: 'totalDeliquencyAmount',
      value: 0,
      legend: 'ADMIN.DASHBOARD.TOTAL_DELIQUENCY_AMOUNT'
    },
    {
      key: 'totalRenewedEnrollments',
      value: 0,
      legend: 'ADMIN.DASHBOARD.TOTAL_RENEWED_ENROLLMENTS'
    },
    {
      key: 'totalCanceledEnrollments',
      value: 0,
      legend: 'ADMIN.DASHBOARD.TOTAL_CANCELED_ENROLLMENTS'
    },
    {
      key: 'totalNewEnrollments',
      value: 0,
      legend: 'ADMIN.DASHBOARD.TOTAL_NEW_ENROLLMENTS'
    },
    {
      key: 'totalPremiumEnrollments',
      value: 0,
      legend: 'ADMIN.DASHBOARD.TOTAL_PREMIUM_ENROLLMENTS'
    },
    {
      key: 'totalBasicEnrollments',
      value: 0,
      legend: 'ADMIN.DASHBOARD.TOTAL_BASIC_ENROLLMENTS'
    }
  ];

  constructor(
    private dashboardService: DashboardService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.dashboardService.getCardsInformation()
      .subscribe({
        next: response => {
          this.loaderService.showLoader();
          Object.keys(response).forEach(key => {
            this.cards.forEach(card => {
              if (card.key === key) card.value = response[key]
            })
          });
        },
        error: err => console.error('Erro ao carregar os dados', err),
        complete: () => this.loaderService.hideLoader()
      }
    );
  };
}
