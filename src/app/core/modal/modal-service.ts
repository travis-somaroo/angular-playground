import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  effect,
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
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  readonly #appRef = inject(ApplicationRef);
  readonly #envInjector = inject(EnvironmentInjector);

  readonly #componentRef = signal<ComponentRef<Modal> | null>(null);

  constructor() {
    effect(() => {
      console.log(this.#componentRef());
    });
  }

  public create(options: ModalConfig): void {
    if (!this.#componentRef()) {
      const compRef = createComponent(Modal, {
        environmentInjector: this.#envInjector
      });

      compRef.setInput('title', options.title);
      compRef.setInput('component', options.component);

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

