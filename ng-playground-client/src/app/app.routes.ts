import { Routes } from '@angular/router';
import { MyFormComponent } from './signal-based-form/my-form/my-form.component';
import { NgReactiveFormComponent } from './ng-reactive-form/ng-reactive-form/ng-reactive-form.component';

export const routes: Routes = [
  {
    path: 'signal',
    component: MyFormComponent
  },
  {
    path: 'reactive',
    component: NgReactiveFormComponent
  },
  {
    path: '',
    redirectTo: 'signal',
    pathMatch: 'full'
  }
];
