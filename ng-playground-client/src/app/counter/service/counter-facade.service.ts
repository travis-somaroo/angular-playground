import { DestroyRef, inject, Injectable } from '@angular/core';
import { CounterState, INITIAL_COUNTER_STATE } from '../../model/counter-state';
import {
  combineLatest,
  map,
  merge,
  NEVER,
  Observable,
  scan,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  tap,
  timer,
  withLatestFrom
} from 'rxjs';
import { Command } from '../../model/command';
import { inputToValue } from '../operators/input-to-value';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class CounterFacadeService {
  private destroyRef = inject(DestroyRef);

  initialCounterState = INITIAL_COUNTER_STATE;

  /**
   * User interactions
   */
  btnStart = new Subject<Event>();
  btnPause = new Subject<Event>();
  btnUp = new Subject<Event>();
  btnDown = new Subject<Event>();
  btnSetTo = new Subject<Event>();
  inputSetTo = new Subject<any>();
  inputTickSpeed = new Subject<Event>();
  inputCountDiff = new Subject<Event>();
  btnReset = new Subject<Event>();


  lastSetToFromButtonClick = this.btnSetTo
    .pipe(
      withLatestFrom(this.inputSetTo.pipe(inputToValue()), (btnSetTo, inputSetTo: number) => {
        return inputSetTo;
      })
    );

  /**
   * State Observable - this is where we will query the state and update the timer.
   */
  programmaticCommandSubject = new Subject<Command>();

  counterCommands$: Observable<Command | any> = merge(
    this.btnStart.pipe(map(() => ({isTicking: true}))),
    this.btnPause.pipe(map(() => ({isTicking: false}))),
    this.lastSetToFromButtonClick.pipe(map(n => ({count: n}))),
    this.btnUp.pipe(map(() => ({countUp: true}))),
    this.btnDown.pipe(map(() => ({countUp: false}))),
    this.inputTickSpeed.pipe(inputToValue(), map(n => ({tickSpeed: n}))),
    this.inputCountDiff.pipe(inputToValue(), map(n => ({countDiff: n}))),
    this.btnReset.pipe(map(() => ({...this.initialCounterState}))),
    this.programmaticCommandSubject.asObservable()
  );

  counterState$: Observable<CounterState> = this.counterCommands$
    .pipe(
      startWith(this.initialCounterState),
      scan((counterState: CounterState, command): CounterState => ({...counterState, ...command})),
      shareReplay(1)
    );


  /**
   * Side effects
   */
  isTicking$ = this.counterState$.pipe(map(state => state.isTicking));
  tickSpeed$ = this.counterState$.pipe(map(state => state.tickSpeed));

  intervalTick$ = combineLatest([this.isTicking$, this.tickSpeed$])
    .pipe(
      switchMap(([isTicking, tickSpeed]) => {
        return isTicking ? timer(0, tickSpeed) : NEVER;
      })
    );

  /**
   * Background effect thats updates the ticking counter based on the action
   */
  updateCounterFromTick$ = this.intervalTick$
    .pipe(
      withLatestFrom(this.counterState$, (_, s) => s),
      tap(({count, countDiff, countUp}) => {
        const diff = countDiff * (countUp ? 1 : -1);
        this.programmaticCommandSubject.next({count: count + diff});
      })
    );

  constructor() {
    const init$ = merge(this.updateCounterFromTick$);
    init$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
