import { Component, computed, inject, signal } from '@angular/core';
import { EnvelopeComponent } from '../envelope/envelope.component';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { DepositRepositoryService } from '../deposit-repository.service';
import { JsonFormSchema } from '../json-form/json-form.model';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Envelope } from '../envelope/envelope';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-add-deposit',
  standalone: true,
  imports: [
    EnvelopeComponent,
    DropdownModule,
    AsyncPipe,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    ButtonModule,
    TabViewModule
  ],
  template: `
    <div class="p-5">
      <div>
        <p-dropdown
          styleClass="w-2 mb-3"
          [formControl]="depositTypeCtrl"
          [options]="repository.depositTypes"
          optionLabel="name"
          (onChange)="depositTypeHandler($event)"
        />
      </div>
      <p-button styleClass="mb-3" label="Add Envelope" (onClick)="addEnvelopeHandler()"/>
      @if (selectedDeposit()) {
        <p-tabView>
          @for (envelopeSchema of envelopeSchemas(); track envelopeSchema; let i = $index) {
            <p-tabPanel>
              <ng-template pTemplate="header">
                <i class="pi pi-envelope mr-3"></i>
                <p>Envelope {{ i + 1 }}</p>
              </ng-template>
              <app-envelope
                [schema]="envelopeSchema"
                [envelopeNum]="i+1"
                (newEnvelope)="newEnvelopeEventHandler($event)"
              />
            </p-tabPanel>
          }
        </p-tabView>
      }
      <div class="mt-3">
        <p-button label="Submit" (onClick)="submitHandler()"/>
      </div>
    </div>
  `
})
export class AddDepositComponent {
  envelopes = signal<Envelope[]>([]);
  envelopeSchemas = signal<JsonFormSchema[]>([]);
  selectedDeposit = signal<JsonFormSchema>(undefined!);
  schema = computed(() => this.selectedDeposit());
  envelopeSchema = computed(() => this.schema().innerBagRule);
  newEnvelopeSchema = computed(() => this.envelopeSchema())

  protected repository = inject(DepositRepositoryService);
  protected depositTypeCtrl = new FormControl();

  depositTypeHandler(event: DropdownChangeEvent) {
    const deposit = event.value;

    this.envelopes.set([]);
    this.envelopeSchemas.set([]);
    this.selectedDeposit.set(deposit);

    if (this.newEnvelopeSchema()) {
      this.envelopeSchemas.update(schemas => [...schemas, this.newEnvelopeSchema()]);
    }
  }

  addEnvelopeHandler() {
    this.envelopeSchemas.update(schemas => [...schemas, this.newEnvelopeSchema()]);
  }

  newEnvelopeEventHandler(envelope: Envelope) {
    this.envelopes.update(env => [...env, envelope]);
  }

  submitHandler() {
    console.log('envelope list', this.envelopes());
  }
}
