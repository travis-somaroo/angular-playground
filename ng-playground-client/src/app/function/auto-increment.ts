import { RxState } from '@rx-angular/state';
import { delay, of, switchMap } from 'rxjs';

export function autoIncrementWhenIdle<K extends string>(
  rxState: RxState<{ [P in K]: number }>,
  {property, interval}: { property: K, interval: number }
) {
  rxState.connect(
    property,
    rxState
      .select(property)
      .pipe(switchMap(() => of(undefined).pipe(delay(interval)))),
    (state) => state[property] + 1
  );
}
