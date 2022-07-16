import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: DashboardComponent },
      { path: 'gestion', component: DashboardComponent },
      { path: 'controls', component: DashboardComponent },
      { path: 'gestor', component: DashboardComponent },
      { path: 'infos', component: DashboardComponent },
      { path: 'changes', component: DashboardComponent },
      { path: 'vista', component: DashboardComponent },
      { path: 'views', component: DashboardComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
