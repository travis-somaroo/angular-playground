import { Component, inject, signal } from '@angular/core';
import { ModalService } from '../../../shared/services/modal-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-modal',
  imports: [
    FormsModule
  ],
  templateUrl: './transaction-modal.html',
})
export class TransactionModal {
  protected readonly name = signal<string>('travis');

  readonly #service = inject(ModalService);

  constructor() {
    console.log('Create TransactionModal');
  }

  protected cancel(): void {
    return this.#service.dismiss(null, 'cancel');
  }

  protected confirm(): void {
    return this.#service.dismiss(this.name(), 'confirm');
  }
}
