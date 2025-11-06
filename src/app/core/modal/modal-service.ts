import { ComponentRef, createComponent, EnvironmentInjector, inject, Injectable, signal } from '@angular/core';
import { Modal } from './components/modal';

export interface ModalConfig {
  title: string;
  component: ComponentRef<unknown>;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  readonly #componentRef = signal<ComponentRef<Modal> | null>(null);
  readonly #envInjector = inject(EnvironmentInjector);

  public create(options?: ModalConfig): void {
    const comp = createComponent(Modal, { environmentInjector: this.#envInjector, hostElement: document.body });
    this.#componentRef.set(comp);
  }

  public close(): void {
    const comp = this.#componentRef();
    comp?.destroy();
    this.#componentRef.set(null);
  }

}
