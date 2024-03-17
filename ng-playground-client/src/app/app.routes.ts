import { Routes } from '@angular/router';
import { SignalDemoComponent } from './signals/basic/signal-demo/signal-demo.component';
import { SignalApplicationComponent } from './signals/basic/signal-application/signal-application.component';
import { SignalEffectsComponent } from './signals/basic/signal-effects/signal-effects.component';

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
    path: 'effects',
    component: SignalEffectsComponent
  },
  {
    path: '',
    redirectTo: 'effects',
    pathMatch: 'full'
  }
];
