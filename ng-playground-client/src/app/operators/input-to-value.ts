import { map, pipe } from 'rxjs';

export function inputToValue(defaultValue: number = null) {
  return pipe(
    map((event: any): number => {
      const parsed = event ? parseInt(event.target.value, 10) : defaultValue;
      return (parsed === 0 || parsed) ? parsed : defaultValue;
    })
  );
}
