import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './auth/guards/admin.guard';
import { ForbiddenComponent } from './error/components/forbidden/forbidden.component';
import { ReportsComponent } from './admin/reports/reports.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: 'reports',
        component: ReportsComponent
      }
    ]
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  }
];
