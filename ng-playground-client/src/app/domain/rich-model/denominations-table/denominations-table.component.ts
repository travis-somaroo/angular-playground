import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CurrencyPipe, NgForOf } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-denominations-table',
  standalone: true,
  imports: [
    InputNumberModule,
    NgForOf,
    ReactiveFormsModule,
    ButtonModule,
    CurrencyPipe
  ],
  template: `
    <div [formGroup]="form">
      <div formArrayName="products">
        @for (product of products.controls; track product; let i = $index) {
          <div class="flex align-items-center gap-3 mb-3" [formGroupName]="i">
            <label class="w-4">{{ product.get('amount').value | currency:'ZAR':'R' }}</label>
            <p-inputNumber
              [min]="0"
              [formControlName]="'quantity'"
              [placeholder]="'Enter quantity'"
              (onInput)="productUpdateHandler()"/>
          </div>
        }
      </div>
    </div>
  `
})
export class DenominationsTableComponent {
  private fb = inject(FormBuilder);

  @Output()
  updatedProducts = new EventEmitter<any[]>();

  form = this.fb.group({
    products: this.fb.array([
      this.fb.group({
        amount: [5, []],
        quantity: [0, []]
      }),
      this.fb.group({
        amount: [10, []],
        quantity: [0, []]
      }),
      this.fb.group({
        amount: [20, []],
        quantity: [0, []]
      }),
      this.fb.group({
        amount: [50, []],
        quantity: [0, []]
      }),
      this.fb.group({
        amount: [100, []],
        quantity: [0, []]
      })
    ])
  });

  protected get products(): FormArray {
    return this.form.controls.products as FormArray;
  }

  productUpdateHandler() {
    this.updatedProducts.emit(this.products.getRawValue());
  }
}
