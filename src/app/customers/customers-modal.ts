import { Component, input } from '@angular/core';
import { DynamicModal } from '../core/modal/dynamic-modal-interface';

@Component({
  selector: 'app-customers-modal',
  template: `
    <div class="p-3">
      <div class="flex items-center justify-between">
        <button (click)="cancel()" class="text-blue-500 font-medium">Cancel</button>
        <button (click)="onConfirm()" class="text-blue-500 font-medium">Confirm</button>
      </div>
      <div class="p-6">
        <h2 class="text-xl font-bold mb-4">Customer Details</h2>
        <p>Customer ID: {{ customerId() }}</p>
        <p>Customer Name: {{ customerName() }}</p>
        <p>Edit Mode: {{ isEditMode() }}</p>
      </div>
    </div>
  `
})
export class CustomersModal implements DynamicModal<{ customerId: number; customerName: string }> {
  readonly customerId = input.required<number>();
  readonly customerName = input.required<string>();
  readonly isEditMode = input.required<boolean>();

  constructor() {
    console.log('CustomersModal constructor');
  }

  protected onConfirm(): void {
    this.confirm({ customerId: 1, customerName: 'Travis Somaroo' });
  }

  public confirm(data: { customerId: number; customerName: string }): void {
  }

  public cancel(): void {
  }

}
