import {
  AfterViewInit,
  Component,
  ComponentRef,
  inject,
  Injector,
  input,
  OnDestroy,
  signal,
  Type,
  viewChild,
  ViewContainerRef
} from '@angular/core';

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
  public readonly component = input.required<Type<unknown>>();
  public readonly componentProps = input<Record<string, unknown>>({});
  public readonly modalContent = viewChild.required('content', { read: ViewContainerRef });

  readonly #injector = inject(Injector);

  readonly #componentRef = signal<ComponentRef<unknown> | null>(null);

  public ngAfterViewInit(): void {
    this.loadComponent();
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
          componentRef.setInput(key, componentProps[key]);
        });
      }

      this.#componentRef.set(componentRef);
      componentRef.changeDetectorRef.detectChanges();
    }
  }

  readonly #destroyComponent = (): void => {
    const componentRef = this.#componentRef();
    const viewContainerRef = this.modalContent();
    if (componentRef) {
      viewContainerRef.clear();
      this.#componentRef.set(null);
    }
  };
}
