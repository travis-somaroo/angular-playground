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
    <div class="modal-overlay">
      <div class="modal-fullscreen">
        <ng-container #content></ng-container>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;
    }

    .modal-fullscreen {
      width: 100%;
      height: 100%;
      background: white;
    }
  `]
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
