import { ListComponent } from './component/list/list.component';
import { ListPickerComponent } from './component/list-picker/list-picker.component';
import { Routes } from '@angular/router';

export const TASK_MANAGER_ROUTES: Routes = [
  {
    path: 'list/:id',
    component: ListComponent
  },
  {
    path: '',
    component: ListPickerComponent
  }
];
