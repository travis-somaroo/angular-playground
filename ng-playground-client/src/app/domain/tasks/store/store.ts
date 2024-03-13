import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';

export class Store<T> {
  private state$: BehaviorSubject<T>;

  constructor(initialState: T) {
    this.state$ = new BehaviorSubject<T>(initialState);
  }

  public select<U>(selectFn: (state: T) => U): Observable<U> {
    return this.state$.asObservable().pipe(map(selectFn), distinctUntilChanged());
  }

  public update(reduceFn: (state: T) => T): void {
    this.state$.next(reduceFn(this.state$.getValue()));
  }

}
