import { Component, inject, input } from '@angular/core';
import { ModalService } from '../core/modal/modal-service';

@Component({
  selector: 'app-customers-modal',
  template: `
    <div class="p-3">
      <div class="flex items-center justify-between">
        <button (click)="onClose()" class="text-blue-500 font-medium">Cancel</button>
        <button class="text-blue-500 font-medium">Confirm</button>
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
export class CustomersModal {
  readonly customerId = input<number>();
  readonly customerName = input<string>();
  readonly isEditMode = input<boolean>();

  readonly #service = inject(ModalService);

  constructor() {
    console.log('CustomersModal constructor');
  }

  protected onClose(): void {
    this.#service.close();
  }
}
