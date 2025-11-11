import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  signal,
  Type
} from '@angular/core';
import { Modal } from './components/modal';
import { DynamicModal } from './dynamic-modal-interface';

export interface ModalConfig<T extends DynamicModal = any> {
  title: string;
  component: Type<T>;
  componentProps?: Record<string, unknown>;
  onConfirm?: (data: any) => void;
  onCancel?: () => void;
}


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  readonly #appRef = inject(ApplicationRef);
  readonly #envInjector = inject(EnvironmentInjector);

  readonly #componentRef = signal<ComponentRef<Modal> | null>(null);

  public create<T extends DynamicModal>(options: ModalConfig<T>): void {
    if (!this.#componentRef()) {
      const compRef = createComponent(Modal, {
        environmentInjector: this.#envInjector
      });

      compRef.setInput('title', options.title);
      compRef.setInput('component', options.component);
      compRef.setInput('componentProps', options.componentProps || {});
      compRef.setInput('onConfirm', options.onConfirm);
      compRef.setInput('onCancel', options.onCancel);

      this.#appRef.attachView(compRef.hostView);
      document.body.appendChild(compRef.location.nativeElement);
      compRef.changeDetectorRef.detectChanges();
      this.#componentRef.set(compRef);
    }
  }

  public close(): void {
    const compRef = this.#componentRef();
    compRef?.destroy();
    this.#componentRef.set(null);
  }
}

