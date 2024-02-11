import { Routes } from '@angular/router';
import { TodoComponent } from './local-state/todo/todo.component';

export const routes: Routes = [
  {
    path: 'local',
    component: TodoComponent
  },
  {
    path: '',
    redirectTo: 'local',
    pathMatch: 'full'
  }
];
