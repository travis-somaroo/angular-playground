import { Routes } from '@angular/router';
import { WidgetComponent } from './demo-01/widget/widget.component';
import { UserListComponent } from './demo-02/user/feature/user-list/user-list.component';

export const routes: Routes = [
  {
    path: 'demo-1',
    component: WidgetComponent
  },
  {
    path: 'demo-2',
    component: UserListComponent
  },
  {
    path: '',
    redirectTo: 'demo-2',
    pathMatch: 'full'
  }
];
