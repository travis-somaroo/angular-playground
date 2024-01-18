import { Routes } from '@angular/router';
import { PullBasedArchComponent } from './pull-based-arch/pull-based-arch.component';

export const routes: Routes = [
  {
    path: 'pull',
    component: PullBasedArchComponent
  },
  {
    path: '',
    redirectTo: 'pull',
    pathMatch: 'full'
  }

];
