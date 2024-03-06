import { JsonFormComponent } from '../json-form/json-form.component';

export class Envelope {
  constructor(
    public _products: any[],
    public _jsonComp: JsonFormComponent,
    public _hasDenominations: boolean = false
  ) {
  }

  set products(value: any[]) {
    this._products = value;
  }

  get hasDenominations(): boolean {
    return this._hasDenominations;
  }

  set hasDenominations(value: boolean) {
    this._hasDenominations = value;
  }

  isValid(): boolean {
    return this._jsonComp.formGroup.valid;
  }
}
