import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ElementIds } from '../../model/element-id';
import { CounterState } from '../../model/counter-state';
import { first, map, ReplaySubject } from 'rxjs';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgForOf } from '@angular/common';
import { SpinnerModule } from 'primeng/spinner';
import { PanelModule } from 'primeng/panel';
import { ToArrayPipe } from '../pipes/to-array.pipe';

@Component({
  standalone: true,
  selector: 'app-counter-view',
  templateUrl: 'counter-view.component.html',
  imports: [
    InputNumberModule,
    ButtonModule,
    FormsModule,
    AsyncPipe,
    SpinnerModule,
    PanelModule,
    NgForOf,
    ToArrayPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterViewComponent {
  elementIds = ElementIds;

  // Replay old emission by one, can just use shareReplay(1) operator
  private stateSubject = new ReplaySubject<CounterState | null>(1);
  state$ = this.stateSubject.asObservable();

  @Input()
  set state(c: CounterState | null) {
    this.stateSubject.next(c);
  }

  /**
   * Dirty code should combine into one object.
   */
  @Output()
  btnStart = new EventEmitter<Event>();

  @Output()
  btnPause = new EventEmitter<Event>();

  @Output()
  btnUp = new EventEmitter<Event>();

  @Output()
  btnDown = new EventEmitter<Event>();

  @Output()
  btnReset = new EventEmitter<Event>();

  @Output()
  btnSetTo = new EventEmitter<Event>();

  @Output()
  inputTickSpeed = new EventEmitter<Event>();

  @Output()
  inputCountDiff = new EventEmitter<Event>();

  @Output()
  inputSetTo = new EventEmitter<Event>();

  initialSetToValue$ = this.state$.pipe(
    first(),
    map(s => s?.count)
  );


}
