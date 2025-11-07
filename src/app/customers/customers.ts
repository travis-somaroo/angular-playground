import { Component, inject } from '@angular/core';
import { ModalService } from '../core/modal/modal-service';
import { CustomersModal } from './customers-modal';

@Component({
  selector: 'app-customers',
  imports: [],
  template: `
    <button
      (click)="onOpen()"
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">
      Open
    </button>
  `,
  styles: ``
})
export class Customers {
  readonly #service = inject(ModalService);

  protected onOpen(): void {
    this.#service.create({
      title: 'Customers Modal',
      component: CustomersModal,
      componentProps: {
        customerId: 123,
        customerName: 'John Doe',
        isEditMode: true
      }
    });
  }
}
