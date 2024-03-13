import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'task-manager',
        loadChildren: () => import('./domain/tasks/task-manager.routes').then(m => m.TASK_MANAGER_ROUTES)
    },
    {
        path: '',
        redirectTo: 'task-manager',
        pathMatch: 'full'
    }
];
