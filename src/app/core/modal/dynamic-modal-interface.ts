export interface DynamicModal<D = any> {
  confirm: (data: D) => void;
  cancel: () => void;
}
