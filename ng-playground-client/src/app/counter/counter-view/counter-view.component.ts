import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { first, map, ReplaySubject } from 'rxjs';
import { CounterState } from '../../model/counter-state';
import { ButtonModule } from 'primeng/button';
import { ToArrayPipe } from '../../pipes/to-array.pipe';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-counter-view',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    ButtonModule,
    NgForOf,
    ToArrayPipe,
    InputNumberModule
  ],
  templateUrl: './counter-view.component.html',
  styleUrl: './counter-view.component.scss'
})
export class CounterViewComponent {
  private stateSubject = new ReplaySubject<CounterState>(1);
  state$ = this.stateSubject.asObservable();

  @Input()
  set state(c: CounterState) {
    this.stateSubject.next(c);
  }

  @Output()
  btnStart = new EventEmitter<any>();

  @Output()
  btnPause = new EventEmitter<any>();

  @Output()
  btnUp = new EventEmitter<any>();

  @Output()
  btnDown = new EventEmitter<any>();

  @Output()
  btnReset = new EventEmitter<any>();

  @Output()
  btnSetTo = new EventEmitter<any>();

  @Output()
  inputTickSpeed = new EventEmitter<any>();

  @Output()
  inputCountDiff = new EventEmitter<any>();

  @Output()
  inputSetTo = new EventEmitter<any>();

  initialSetToValue$ = this.state$
    .pipe(
      first(),
      map(s => s.count),
    );

  // onReset($event: any) {
  //   console.log($event);
  //   this.btnReset.next($event);
  // }
}
