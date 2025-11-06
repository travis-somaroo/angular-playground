import { createComponent, EnvironmentInjector, inject, Injectable, signal } from '@angular/core';
import { HTMLModalElement, ModalOptions } from '../models/modal-model';
import { Modal } from '../components/modal/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  readonly #envInjector = inject(EnvironmentInjector);
  readonly #activeModal = signal<HTMLModalElement | null>(null);

  public async create(options: ModalOptions): Promise<HTMLModalElement> {
    const modalRef = createComponent(Modal, {
      environmentInjector: this.#envInjector,
    });

    const modalElement: HTMLModalElement = {
      present: async () => {
        document.body.appendChild(modalRef.location.nativeElement);
        modalRef.instance.present().then();
      },
      dismiss: async (data?: any, role?: string) => {
        await modalRef.instance.dismiss(data, role);
        modalRef.destroy();
        this.#activeModal.set(null);
        return true;
      },
      onDidDismiss: () => modalRef.instance.onDidDismiss(),
      onWillDismiss: () => modalRef.instance.onWillDismiss(),
    };

    modalRef.setInput('component', options.component);
    modalRef.setInput('componentProps', options.componentProps);

    this.#activeModal.set(modalElement);
    return modalElement;
  }

  public dismiss(data?: any, role?: string): void {
    const modal = this.#activeModal();
    if (modal) {
      modal.dismiss(data, role).then();
    }
  }
}
