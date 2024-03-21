import { Component, input } from '@angular/core';

@Component({
  selector: 'app-widget-error',
  standalone: true,
  template: `
    <h4>Widget Error: </h4>
    <p class="text-red-500 text-xl">{{ error()?.message }}</p>
  `
})
export class WidgetErrorComponent {
  error = input<Error | null>(null);
}
