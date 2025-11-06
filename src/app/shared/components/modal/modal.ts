import {
  AfterViewInit,
  Component,
  computed,
  createComponent,
  EnvironmentInjector,
  inject,
  input,
  OnDestroy,
  output,
  signal,
  viewChild,
  ViewContainerRef
} from '@angular/core';

// todo: resolve "any" types

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
})
export class Modal implements AfterViewInit, OnDestroy {
  public readonly component = input<any>();
  public readonly componentProps = input<Record<string, any>>({});

  public readonly willDismiss = output<{ data: any; role: string }>();
  public readonly didDismiss = output<{ data: any; role: string }>();

  public readonly modalContent = viewChild.required('modalContent', { read: ViewContainerRef });

  readonly #envInjector = inject(EnvironmentInjector);

  readonly #isPresented = signal<boolean>(false);
  readonly #dismissData = signal<{ data: any; role: string } | null>(null);

  protected readonly backdropClass = computed(() =>
    this.#isPresented() ? 'opacity-100' : 'opacity-0'
  );

  protected dismissResolve?: (value: { data: any; role: string }) => void;
  protected willDismissResolve?: (value: { data: any; role: string }) => void;

  readonly #dismissPromise = new Promise<{ data: any; role: string }>((resolve) => {
    this.dismissResolve = resolve;
  });
  readonly #willDismissPromise = new Promise<{ data: any; role: string }>((resolve) => {
    this.willDismissResolve = resolve;
  });

  readonly #loadComponent = (): void => {
    console.log('running');
    const component = this.component();
    const vcr = this.modalContent();

    if (component && vcr) {
      vcr.clear();

      const componentRef = createComponent(component, {
        environmentInjector: this.#envInjector,
      });

      const props = this.componentProps();
      Object.keys(props).forEach(key => {
        componentRef.setInput(key, props[key]);
      });

      vcr.insert(componentRef.hostView);
    }
  };

  public async present(): Promise<void> {
    this.#isPresented.set(true);
    return Promise.resolve();
  }

  public async dismiss(data?: any, role: string = 'cancel'): Promise<void> {
    this.#dismissData.set({ data, role });
    this.#isPresented.set(false);

    this.willDismiss.emit({ data, role });
    this.willDismissResolve?.({ data, role });

    await new Promise(resolve => setTimeout(resolve, 300));

    this.didDismiss.emit({ data, role });
    this.dismissResolve?.({ data, role });
  }

  public onBackdropClick(event: MouseEvent): void {
    this.dismiss(null, 'backdrop').then();
  }

  public onDidDismiss<T = any>(): Promise<{ data: T; role: string }> {
    return this.#dismissPromise as Promise<{ data: T; role: string }>;
  }

  public onWillDismiss<T = any>(): Promise<{ data: T; role: string }> {
    return this.#willDismissPromise as Promise<{ data: T; role: string }>;
  }

  public ngAfterViewInit(): void {
    this.#loadComponent();
  }

  public ngOnDestroy(): void {
    this.modalContent().clear();
  }

}
