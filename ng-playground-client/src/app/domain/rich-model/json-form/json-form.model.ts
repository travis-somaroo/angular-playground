export interface JsonFormValidators {
  min: number;
  max: number;
  required: boolean;
}

export interface JsonFormControls {
  propertyName: string;
  displayName: string;
  defaultValue: string;
  type: string;
  validators: JsonFormValidators;
}

export interface JsonFormSchema {
  id: number;
  name: string;
  code: string;
  deleted: boolean;
  maximumInnerBags: number;
  aggregated: boolean;
  propertyRules: JsonFormControls[];
  innerBagRule: JsonFormSchema;
}

