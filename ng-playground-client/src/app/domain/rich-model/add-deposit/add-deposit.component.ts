import { Component, computed, inject, signal } from '@angular/core';
import { EnvelopeComponent } from '../envelope/envelope.component';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { DepositRepositoryService } from '../deposit-repository.service';
import { JsonFormSchema } from '../json-form/json-form.model';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Envelope } from '../envelope/envelope';

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
    ButtonModule
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
        @for (envelopeSchema of envelopeSchemas(); track envelopeSchema; let i = $index) {
          <app-envelope [schema]="envelopeSchema" [envelopeNum]="i+1" (newEnvelope)="newEnvelopeEventHandler($event)"/>
        } @empty {
          <h5>No envelopes have been added!</h5>
        }
      }

      <div class="mt-3">
        <p-button label="Submit" (onClick)="submitHandler()"/>
      </div>
    </div>
  `
})
export class AddDepositComponent {
  protected repository = inject(DepositRepositoryService);
  protected depositTypeCtrl = new FormControl();

  envelopes = signal<Envelope[]>([]);
  envelopeSchemas = signal<JsonFormSchema[]>([]);

  selectedDeposit = signal<JsonFormSchema>(undefined!);
  schema = computed(() => this.selectedDeposit());
  envelopeSchema = computed(() => this.schema().innerBagRule);
  newEnvelopeSchema = computed(() => this.envelopeSchema());

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
