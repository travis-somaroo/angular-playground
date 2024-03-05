import { Component, Input } from '@angular/core';
import { Envelope } from './envelope';

@Component({
  selector: 'app-envelope',
  standalone: true,
  imports: [],
  template: `
  `,
  styles: ``
})
export class EnvelopeComponent {
  @Input() envelope: Envelope;


  constructor() {
    const env = new Envelope([], null);
    env.isValidEnvelope()
  }
}
