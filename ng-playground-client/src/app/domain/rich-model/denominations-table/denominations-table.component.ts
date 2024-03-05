import { Component, inject } from '@angular/core';
import { NgForOf } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-denominations-table',
  standalone: true,
  imports: [
    InputNumberModule,
    NgForOf,
    ReactiveFormsModule
  ],
  template: `
    <div [formGroup]="form">
      <div formArrayName="products">
        <ng-container *ngFor="let product of products.controls; let i = index">
          <div class="mb-3" [formGroupName]="i">
            <label class="mr-3">Denomination {{ i + 1 }}</label>
            <p-inputNumber [placeholder]="'Enter quantity'" [min]="0"/>
          </div>
        </ng-container>
      </div>
    </div>
  `,
  styles: ``
})
export class DenominationsTableComponent {
  private fb = inject(FormBuilder);


  form = this.fb.group({
    products: this.fb.array([])
  });

  constructor() {
    this.addProducts();
  }

  get products(): FormArray {
    return this.form.controls.products as FormArray;
  }

  addProducts() {
    const productsCtrl = this.form.controls.products as FormArray;
    for (let i = 0; i < 4; i++) {
      productsCtrl.push(this.createProduct());
    }
  }

  createProduct(): FormGroup {
    return this.fb.group({
      amount: [100, []],
      quantity: [0, []]
    });
  }
}
