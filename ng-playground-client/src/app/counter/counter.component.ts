import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CounterFacadeService } from './service/counter-facade.service';
import { CounterViewComponent } from './ui/counter-view.component';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-counter',
  template: `
    <app-counter-view
      [state]="counterFacade.counterState$ | async"
      (btnStart)="counterFacade.btnStart.next($event)"
      (btnPause)="counterFacade.btnPause.next($event)"
      (btnSetTo)="counterFacade.btnSetTo.next($event)"
      (inputSetTo)="counterFacade.inputSetTo.next($event)"
      (btnUp)="counterFacade.btnUp.next($event)"
      (btnDown)="counterFacade.btnDown.next($event)"
      (inputTickSpeed)="counterFacade.inputTickSpeed.next($event)"
      (inputCountDiff)="counterFacade.inputCountDiff.next($event)"
      (btnReset)="counterFacade.btnReset.next($event)"
    >
    </app-counter-view>
  `,
  imports: [
    CounterViewComponent,
    AsyncPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
  protected counterFacade = inject(CounterFacadeService);
}
