import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomeComponent },
      { path: 'banca', component: HomeComponent },
      { path: 'linea', component: HomeComponent },
      { path: 'info', component: HomeComponent },
      { path: 'gestor', component: HomeComponent },
      { path: 'consumo', component: HomeComponent },
      { path: 'convenio', component: HomeComponent },
      { path: 'canal', component: HomeComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
