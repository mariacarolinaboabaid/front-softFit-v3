import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: MainLayoutComponent, children: [
      { path: '', component: DashboardComponent }
    ]
  }
];

@NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    })
  export class AdministratorRoutingModule { }
