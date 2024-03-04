import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
      {{ totalAmount | currency }}
    </p>
  `,
  styles: ``
})
export class DenominationsTableComponent implements OnInit {
  totalAmount = 1000;

  @Output()
  amount = new EventEmitter<number>();

  ngOnInit(): void {
    this.amount.emit(this.totalAmount);
  }

}
