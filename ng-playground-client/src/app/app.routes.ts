import { Routes } from '@angular/router';
import { SignalDemoComponent } from './signals/basic/signal-demo/signal-demo.component';
import { SignalApplicationComponent } from './signals/basic/signal-application/signal-application.component';

export const routes: Routes = [
  {
    path: '',
    component: SignalDemoComponent
  },
  {
    path: 'app',
    component: SignalApplicationComponent
  },
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  }
];
