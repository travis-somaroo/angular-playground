import { Component, inject } from '@angular/core';
import { CounterViewComponent } from './counter-view/counter-view.component';
import { CounterFacadeService } from '../service/counter-facade.service';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-counter',
    standalone: true,
    imports: [
        CounterViewComponent,
        AsyncPipe
    ],
    template: `
        <app-counter-view
                [state]="facade.counterState$ | async"
                (btnStart)="facade.btnStart.next($event)"
                (btnPause)="facade.btnPause.next($event)"
                (btnSetTo)="facade.btnSetTo.next($event)"
                (inputSetTo)="facade.inputSetTo.next($event)"
                (btnUp)="facade.btnUp.next($event)"
                (btnDown)="facade.btnDown.next($event)"
                (inputTickSpeed)="facade.inputTickSpeed.next($event)"
                (inputCountDiff)="facade.inputCountDiff.next($event)"
                (btnReset)="facade.btnReset.next($event)"
        />
    `
})
export class CounterComponent {
    protected facade = inject(CounterFacadeService);
}
