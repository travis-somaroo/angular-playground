import { Routes } from '@angular/router';
import { MyFormComponent } from './my-form/my-form.component';
import { NgReactiveFormComponent } from './ng-reactive-form/ng-reactive-form/ng-reactive-form.component';

export const routes: Routes = [
  {
    path: 'signal-reactive-forms',
    component: MyFormComponent
  },
  {
    path: 'ng-reactive-forms',
    component: NgReactiveFormComponent
  },
  {
    path: '',
    redirectTo: 'ng-reactive-forms',
    pathMatch: 'full'
  }
];
