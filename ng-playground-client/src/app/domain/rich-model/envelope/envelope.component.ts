import { AfterViewInit, Component, computed, effect, EventEmitter, input, Output, viewChild } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { JsonFormComponent } from '../json-form/json-form.component';
import { JsonFormSchema } from '../json-form/json-form.model';
import { DenominationsTableComponent } from '../denominations-table/denominations-table.component';
import { SharedModule } from 'primeng/api';
import { Envelope } from './envelope';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-envelope',
  standalone: true,
  imports: [
    JsonFormComponent,
    DenominationsTableComponent,
    SharedModule,
    TabViewModule,
    NgIf,
    AsyncPipe
  ],
  template: `
    <div class="border-1 border-gray-300 p-5">
      <h3>Envelope {{ envelopeNum() }}</h3>
      <div>
        @if (schema()) {
          <app-json-form [formSchema]="schema()" #jsonFormComp/>
        }
        <h4>Denominations</h4>
        <app-denominations-table (updatedProducts)="updatedProductsHandler($event)" #denominationsComp/>
      </div>
    </div>
  `
})
export class EnvelopeComponent implements AfterViewInit {
  schema = input.required<JsonFormSchema>();
  envelopeNum = input.required<number>();

  jsonFormComp = viewChild<JsonFormComponent>('jsonFormComp');
  denominationsComp = viewChild<DenominationsTableComponent>('denominationsComp');

  envelope = computed(() => {
    return new Envelope(this.denominationsComp().form.controls.products.getRawValue(), this.jsonFormComp());
  });

  @Output() newEnvelope = new EventEmitter<Envelope>();

  constructor() {
    effect(() => {
      console.log('envelope', this.envelope());
    });
  }

  ngAfterViewInit() {
    this.newEnvelope.emit(this.envelope());
  }

  updatedProductsHandler(products: any[]) {
    this.envelope().products = products;
  }
}
