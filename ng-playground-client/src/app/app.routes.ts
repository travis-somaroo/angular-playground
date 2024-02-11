import { Routes } from '@angular/router';
import { TodoListComponent } from './local-state/todo/todo-list.component';

export const routes: Routes = [
  {
    path: 'local',
    component: TodoListComponent
  },
  {
    path: '',
    redirectTo: 'local',
    pathMatch: 'full'
  }
];
