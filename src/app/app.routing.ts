import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'account',
        loadChildren:
          () => import('./account/account.module').then(m => m.AccountModule)
      },/*{
        path: 'status',
        loadChildren:
          () => import('./account/account.module').then(m => m.AccountModule)
      }, */
      {
        path: 'funnels',
        loadChildren:
          () => import('./funnel/funnel.module').then(m => m.FunnelModule)
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  }
];
