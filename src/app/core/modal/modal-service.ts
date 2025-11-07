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

export interface ModalConfig {
  title: string;
  component: Type<unknown>;
  componentProps?: Record<string, unknown>;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  readonly #appRef = inject(ApplicationRef);
  readonly #envInjector = inject(EnvironmentInjector);

  readonly #componentRef = signal<ComponentRef<Modal> | null>(null);

  public create(options: ModalConfig): void {
    if (!this.#componentRef()) {
      const compRef = createComponent(Modal, {
        environmentInjector: this.#envInjector
      });

      compRef.setInput('title', options.title);
      compRef.setInput('component', options.component);
      compRef.setInput('componentProps', options.componentProps || {});

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

