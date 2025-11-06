import { Component, inject } from '@angular/core';
import { ModalService } from '../core/modal/modal-service';

@Component({
  selector: 'app-customers-modal',
  template: `
    <div class="p-3">
      <div class="flex items-center justify-between">
        <button (click)="onClose()" class="text-blue-500 font-medium">Cancel</button>
        <button class="text-blue-500 font-medium">Confirm</button>
      </div>
      <div>
        <p>Customers</p>
      </div>
    </div>
  `
})
export class CustomersModal {
  readonly #service = inject(ModalService);

  constructor() {
    console.log('CustomersModal constructor');
  }

  protected onClose(): void {
    this.#service.close();
  }
}
