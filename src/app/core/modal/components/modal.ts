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
      class="fixed inset-0 z-[1000] flex items-end justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
    >
      <div
        class="w-full sm:max-w-md rounded-t-2xl bg-white shadow-lg animate-slide-up overflow-hidden"
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
  public readonly modalContent = viewChild.required('content', { read: ViewContainerRef });

  readonly #injector = inject(Injector);

  readonly #componentRef = signal<ComponentRef<unknown> | null>(null);

  public ngAfterViewInit(): void {
    this.loadComponent();
  }

  public ngOnDestroy(): void {
    this.destroyComponent();
  }

  protected loadComponent(): void {
    const component = this.component();
    const container = this.modalContent();

    if (component && container) {
      container.clear();
      this.#componentRef.set(container.createComponent(component, {
        injector: this.#injector
      }));
      const componentRef = this.#componentRef();
      if (componentRef) {
        componentRef.changeDetectorRef.detectChanges();
      }
    }
  }

  protected destroyComponent(): void {
    const componentRef = this.#componentRef();
    if (componentRef) {
      componentRef.destroy();
      this.#componentRef.set(null);
    }
  }
}
