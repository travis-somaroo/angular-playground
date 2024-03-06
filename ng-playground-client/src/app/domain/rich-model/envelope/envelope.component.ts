import { AfterViewInit, Component, computed, EventEmitter, input, Output, viewChild } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { JsonFormComponent } from '../json-form/json-form.component';
import { JsonFormSchema } from '../json-form/json-form.model';
import { DenominationsTableComponent } from '../denominations-table/denominations-table.component';
import { SharedModule } from 'primeng/api';
import { Envelope } from './envelope';
import { AsyncPipe, NgIf } from '@angular/common';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
  selector: 'app-envelope',
  standalone: true,
  imports: [
    JsonFormComponent,
    DenominationsTableComponent,
    SharedModule,
    TabViewModule,
    NgIf,
    AsyncPipe,
    ToggleButtonModule
  ],
  template: `
    <div>
      @if (schema()) {
        <app-json-form [formSchema]="schema()" #jsonFormComp/>
      }
      <div class="flex justify-content-end">
        <p-toggleButton
          offLabel="Enter Denominations"
          onLabel="Cancel Denominations"
          (onChange)="toggleDenominationsHandler()"
        />
      </div>
      @if (envelope().hasDenominations) {
        <app-denominations-table (updatedProducts)="updatedProductsHandler($event)" #denominationsComp/>
      }
    </div>
  `
})
export class EnvelopeComponent implements AfterViewInit {
  schema = input.required<JsonFormSchema>();
  envelopeNum = input.required<number>();

  @Output() newEnvelope = new EventEmitter<Envelope>();

  jsonFormComp = viewChild<JsonFormComponent>(JsonFormComponent);
  denominationsComp = viewChild<DenominationsTableComponent>(DenominationsTableComponent);

  envelope = computed(() => {
    return new Envelope([], this.jsonFormComp());
  });

  ngAfterViewInit() {
    this.newEnvelope.emit(this.envelope());
  }

  updatedProductsHandler(products: any[]) {
    this.envelope().products = products;
  }

  toggleDenominationsHandler() {
    this.envelope().hasDenominations = !this.envelope().hasDenominations;
  }
}
