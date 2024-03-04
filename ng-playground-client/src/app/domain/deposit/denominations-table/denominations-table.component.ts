import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-denominations-table',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  template: `
    <h4>Denominations Table</h4>
    <p>
      {{ amount | currency }}
    </p>
  `,
  styles: ``
})
export class DenominationsTableComponent {
  amount = 1000;
}
