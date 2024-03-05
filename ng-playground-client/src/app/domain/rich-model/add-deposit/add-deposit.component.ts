import { Component } from '@angular/core';
import { EnvelopeComponent } from '../envelope/envelope.component';

@Component({
  selector: 'app-add-deposit',
  standalone: true,
  imports: [
    EnvelopeComponent
  ],
  template: `
    <ng-container>
      <app-envelope></app-envelope>
    </ng-container>
  `,
  styles: ``
})
export class AddDepositComponent {



}
