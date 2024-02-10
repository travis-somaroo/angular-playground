import { Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerTableComponent } from './customer-table/customer-table.component';

export const routes: Routes = [
  {
    path: 'list',
    component: CustomerListComponent
  },
  {
    path: 'table',
    component: CustomerTableComponent
  },
  {
    path: '',
    redirectTo: 'table',
    pathMatch: 'full'
  }
];
