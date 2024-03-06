import { JsonFormComponent } from '../json-form/json-form.component';

export class Envelope {
  constructor(public _products: any[], public _jsonComp: JsonFormComponent) {
  }

  isValidEnvelope(): boolean {
    return this._jsonComp.formGroup.valid;
  }

  set jsonComp(value: JsonFormComponent) {
    this._jsonComp = value;
  }

  set products(value: any[]) {
    this._products = value;
  }
}
