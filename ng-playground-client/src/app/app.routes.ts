import { Routes } from '@angular/router';
import { PullBasedArchComponent } from './pull-based-arch/pull-based-arch.component';
import { PushBasedArchComponent } from './push-based-arch/push-based-arch.component';

export const routes: Routes = [
  {
    path: 'pull',
    component: PullBasedArchComponent
  },
  {
    path: 'push',
    component: PushBasedArchComponent
  },
  {
    path: '',
    redirectTo: 'push',
    pathMatch: 'full'
  }
];
