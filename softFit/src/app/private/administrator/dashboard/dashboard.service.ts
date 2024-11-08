import { Injectable } from '@angular/core';
import { BestRatedTrainers, DashboardCards, DeliquentMember } from './dashboard.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.develop';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  API_URL = environment.API_URL;
  mockUrlInstructors = "../../assets/mock/administrator/instructors.json";
  
  constructor(private httpClient: HttpClient) { }

  getCardsInformation() {
    return this.httpClient.get<DashboardCards>(`${this.API_URL}/clients-statistics`)
  };

  getBestRatedTrainers() {
    return this.httpClient.get<BestRatedTrainers[]>(`${this.API_URL}/instructors/top-five-rate-instructors-by-client-id`);
  };

  getDeliquentMembers() {
    return this.httpClient.get<DeliquentMember[]>(`${this.API_URL}/customers/deliquents-customers-by-client-id`);
  };
}
