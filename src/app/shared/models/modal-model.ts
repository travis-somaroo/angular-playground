export interface ModalOptions {
  component: any;
  componentProps?: Record<string, any>;
}

export interface ModalResult<T = any> {
  data: T;
  role: string;
}

export interface HTMLModalElement {
  present(): Promise<void>;

  dismiss(data?: any, role?: string): Promise<boolean>;

  onDidDismiss<T = any>(): Promise<ModalResult<T>>;

  onWillDismiss<T = any>(): Promise<ModalResult<T>>;
}
