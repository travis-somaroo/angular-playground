import { Routes } from '@angular/router';
import { NgReactiveFormComponent } from './ng-reactive-form/ng-reactive-form/ng-reactive-form.component';
import { MyFormComponent } from './complex-signal-based-form/components/my-form/my-form.component';
import { SimpleFormComponent } from './simple-signal-based-form/components/simple-form/simple-form.component';

export const routes: Routes = [
  {
    path: 'simple-signal',
    component: SimpleFormComponent
  },
  {
    path: 'complex-signal',
    component: MyFormComponent
  },
  {
    path: 'reactive',
    component: NgReactiveFormComponent
  },
  {
    path: '',
    redirectTo: 'simple-signal',
    pathMatch: 'full'
  }
];
