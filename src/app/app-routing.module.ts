import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialComponent } from './initial/initial.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'initial',
    pathMatch: 'full',
  },
  {
    path: 'init',
    component: InitialComponent,
  },
  {
    path: 'initial',
    component: InitialComponent,
  },
  {
    path: 'canal',
    component: InitialComponent,
  },
  {
    path: 'consumo',
    component: InitialComponent,
  },
  {
    path: 'convenio',
    component: InitialComponent,
  },

  // PRESTAMOS ROUTES
  {
    path: 'prestamos',
    loadChildren: () =>
      import('./prestamos/prestamos.module').then((m) => m.PrestamosModule),
  },

  // HOME ROUTES
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'inicio',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'ingreso',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  // HOME ROUTES

  // Dashboard ROUTES
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'tablero',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'central',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  // Dashboard ROUTES

  { path: '**', component: InitialComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
