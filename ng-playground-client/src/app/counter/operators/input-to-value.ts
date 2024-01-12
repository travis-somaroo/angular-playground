import { map, pipe } from 'rxjs';

// Was to lazy to write a form with controls to make a function that gets the value from the input $event
export function inputToValue(defaultValue: number = null!) {
  return pipe(
    map((event: any): number => {
      const parsed = event ? parseInt(event.target.value, 10) : defaultValue;
      return (parsed === 0 || parsed) ? parsed : defaultValue;
    })
  );
}
