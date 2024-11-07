import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'admin', 
    loadChildren: () => import('./private/administrator/administrator.module').then(m => m. AdministratorModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
