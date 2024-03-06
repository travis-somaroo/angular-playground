import { Component, EventEmitter, inject, Output } from '@angular/core';
import { NgForOf } from '@angular/common';
import { InputNumberInputEvent, InputNumberModule } from 'primeng/inputnumber';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-denominations-table',
  standalone: true,
  imports: [
    InputNumberModule,
    NgForOf,
    ReactiveFormsModule,
    ButtonModule
  ],
  template: `
    <div [formGroup]="form">
      <div formArrayName="products">
        <ng-container *ngFor="let product of products.controls; let i = index">
          <div class="mb-3" [formGroupName]="i">
            <label class="mr-3">Denomination {{ i + 1 }}</label>
            <p-inputNumber formControlName="quantity" [placeholder]="'Enter quantity'"
                           (onInput)="productUpdateHandler($event)" [min]="0"/>
          </div>
        </ng-container>
      </div>
      <p-button (onClick)="logHandler()" label="Test"/>
    </div>
  `,
  styles: ``
})
export class DenominationsTableComponent {
  private fb = inject(FormBuilder);

  @Output()
  updatedProducts = new EventEmitter<any[]>();

  form = this.fb.group({
    products: this.fb.array([])
  });

  constructor() {
    this.addProducts();
  }

  protected get products(): FormArray {
    return this.form.controls.products as FormArray;
  }

  private addProducts() {
    const productsCtrl = this.form.controls.products as FormArray;
    for (let i = 0; i < 4; i++) {
      productsCtrl.push(this.createProduct());
    }
  }

  private createProduct(): FormGroup {
    return this.fb.group({
      amount: [100, []],
      quantity: [0, []]
    });
  }

  logHandler() {
    console.log(this.form.controls.products.getRawValue());
  }

  productUpdateHandler(event: InputNumberInputEvent) {
    this.updatedProducts.emit(this.products.getRawValue());
  }
}
