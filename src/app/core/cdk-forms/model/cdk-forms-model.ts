export type FormElementType =
  | 'text'
  | 'email'
  | 'number'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'date';

export interface FormElement {
  id: string;
  type: FormElementType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  value?: any;
}

export interface FormElementTemplate {
  type: FormElementType;
  icon: string;
  label: string;
  defaultLabel: string;
}

export interface FormBuilderState {
  elements: FormElement[];
  selectedElementId: string | null;
}
