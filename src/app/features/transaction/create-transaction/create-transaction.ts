import { Component, inject, signal } from '@angular/core';
import { ModalService } from '../../../shared/services/modal-service';
import { TransactionModal } from '../transaction-modal/transaction-modal';

@Component({
  selector: 'app-create-transaction',
  imports: [],
  templateUrl: './create-transaction.html',
})
export class CreateTransaction {
  readonly #service = inject(ModalService);

  protected readonly message = signal<string>('some data');

  protected async openModal() {
    const modal = await this.#service.create({
      component: TransactionModal
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.message.set(`Hello, ${data}!`);
    }
  }
}
