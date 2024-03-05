import { JsonFormComponent } from '../json-form/json-form.component';

export class Envelope {
  constructor(public products: any[], public jsonComp: JsonFormComponent) {
  }

  isValidEnvelope(): boolean {
    return this.jsonComp.formGroup.valid;
  }

}
