import { Component, input } from '@angular/core';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-widget-error',
  standalone: true,
  imports: [
    MessageModule
  ],
  template: `
    <p-message styleClass="w-full" severity="error" [text]="error()?.message"/>
  `
})
export class WidgetErrorComponent {
  error = input<Error | null>(null);
}
