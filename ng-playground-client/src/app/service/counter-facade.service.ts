import { DestroyRef, inject, Injectable } from '@angular/core';
import {
  combineLatest,
  distinctUntilChanged,
  map,
  merge,
  NEVER,
  scan,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  tap,
  timer,
  withLatestFrom
} from 'rxjs';
import { Command } from '../model/command';
import { CounterState, CounterStateKeys, INITIAL_COUNTER_STATE } from '../model/counter-state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { inputToValue } from '../operators/input-to-value';

@Injectable({
  providedIn: 'root'
})
export class CounterFacadeService {
  private destroyRef = inject(DestroyRef);

  initialCounterState: CounterState = INITIAL_COUNTER_STATE;

// Actions
  btnStart = new Subject<Event>();
  btnPause = new Subject<Event>();
  btnUp = new Subject<Event>();
  btnDown = new Subject<Event>();
  btnSetTo = new Subject<Event>();
  inputSetTo = new Subject<any>();
  inputTickSpeed = new Subject<Event>();
  inputCountDiff = new Subject<Event>();
  btnReset = new Subject<Event>();

  lastSetToFromButtonClick = this.btnSetTo.asObservable()
    .pipe(
      withLatestFrom(this.inputSetTo.pipe(inputToValue()), (btnSetTo, inputSetTo: number) => {
        return inputSetTo;
      }));

  private commandSubject = new Subject<Command>();
  counterCommands$ = merge(
    this.btnStart.pipe(map(() => ({isTicking: true}))),
    this.btnPause.pipe(map(() => ({isTicking: false}))),
    this.btnUp.pipe(map(() => ({countUp: true}))),
    this.btnDown.pipe(map(() => ({countUp: false}))),
    this.lastSetToFromButtonClick.pipe(map(n => ({count: n}))),
    this.inputTickSpeed.pipe(inputToValue(), map(n => ({ tickSpeed: n }))),
    this.inputCountDiff.pipe(inputToValue(), map(n => ({countDiff: n}))),
    this.btnReset.pipe(map(() => ({...this.initialCounterState}))),
    this.commandSubject.asObservable()
  );

  counterState$ = this.counterCommands$.pipe(
    startWith(this.initialCounterState),
    scan((counterState: CounterState, command): CounterState => ({...counterState, ...command})),
    tap(s => console.log('counter state', s)),
    shareReplay(1)
  );

  isTicking$ = this.counterState$.pipe(
    map((counterState: CounterState) => counterState[CounterStateKeys.isTicking]),
    distinctUntilChanged<boolean>()
  );

  tickSpeed$ = this.counterState$.pipe(
    map((counterState: CounterState) => counterState[CounterStateKeys.tickSpeed]),
    distinctUntilChanged<number>()
  );

  intervalTick$ = combineLatest([this.isTicking$, this.tickSpeed$])
    .pipe(
      switchMap(([isTicking, tickSpeed]) => {
        return isTicking ? timer(0, tickSpeed) : NEVER;
      })
    );

  updateCounterState$ = this.intervalTick$
    .pipe(
      withLatestFrom(this.counterState$, (_, s) => s),
      tap(({count, countDiff, countUp}) => {
        const diff = countDiff * (countUp ? 1 : -1);
        this.commandSubject.next({count: count + diff});
      })
    );

  constructor() {
    merge(
      this.updateCounterState$,
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
