import {
  AfterViewInit,
  Component,
  ComponentRef,
  inject,
  Injector,
  input,
  OnDestroy,
  output,
  signal,
  Type,
  viewChild,
  ViewContainerRef
} from '@angular/core';
import { DynamicModal } from '../dynamic-modal-interface';
import { ModalService } from '../modal-service';

@Component({
  selector: 'app-modal',
  template: `
    <div
      class="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
    >
      <div
        class="w-full h-full bg-white shadow-xl animate-scale-up rounded-none sm:rounded-xl overflow-hidden"
      >
        <ng-container #content></ng-container>
      </div>
    </div>
  `,
  styleUrl: './modal.scss'
})
export class Modal implements AfterViewInit, OnDestroy {
  public readonly title = input<string>('');
  public readonly component = input.required<Type<DynamicModal>>();
  public readonly componentProps = input<Record<string, unknown>>({});
  public readonly onConfirm = input<(data?: any) => void>();
  public readonly onCancel = input<() => void>();

  public readonly modalContent = viewChild.required('content', { read: ViewContainerRef });

  public readonly confirm = output<any>();
  public readonly cancel = output<void>();

  readonly #injector = inject(Injector);
  readonly #modalService = inject(ModalService);

  readonly #componentRef = signal<ComponentRef<DynamicModal> | null>(null);

  public ngAfterViewInit(): void {
    this.loadComponent();
    this.#setupOutputListeners();
  }

  public ngOnDestroy(): void {
    this.#destroyComponent();
  }

  protected loadComponent(): void {
    const component = this.component();
    const componentProps = this.componentProps();
    const viewContainerRef = this.modalContent();

    if (component && viewContainerRef) {
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent(component, {
        injector: this.#injector
      });

      if (componentProps) {
        Object.keys(componentProps).forEach(key => {
          if (key !== 'confirm' && key !== 'cancel') {
            componentRef.setInput(key, componentProps[key]);
          }
        });
      }

      this.#componentRef.set(componentRef);
      componentRef.changeDetectorRef.detectChanges();
    }
  }

  readonly #setupOutputListeners = (): void => {
    const componentRef = this.#componentRef();
    if (!componentRef) return;

    const instance = componentRef.instance;

    const originalConfirm = instance.confirm;
    instance.confirm = (data: any) => {
      originalConfirm(data);
      this.#handleConfirm(data);
    };

    const originalCancel = instance.cancel;
    instance.cancel = () => {
      originalCancel();
      this.#handleCancel();
    };
  };

  readonly #handleConfirm = (data: any): void => {
    this.confirm.emit(data);
    this.onConfirm()?.(data);
    this.#closeModal();
  };

  readonly #handleCancel = (): void => {
    this.cancel.emit();
    this.onCancel()?.();
    this.#closeModal();
  };

  readonly #closeModal = (): void => {
    this.#modalService.close();
  };

  readonly #destroyComponent = (): void => {
    const componentRef = this.#componentRef();
    const viewContainerRef = this.modalContent();
    if (componentRef) {
      viewContainerRef.clear();
      this.#componentRef.set(null);
    }
  };
}
