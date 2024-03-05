import { Component, inject } from '@angular/core';
import { EnvelopeComponent } from '../envelope/envelope.component';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { DepositRepositoryService } from '../deposit-repository.service';
import { BehaviorSubject, filter, map } from 'rxjs';
import { JsonFormSchema } from '../json-form/json-form.model';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';

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
    <div>
      <div>
        <p-dropdown
          styleClass="w-2 mb-3"
          [formControl]="depositTypeCtrl"
          [options]="repository.depositTypes"
          optionLabel="name"
          (onChange)="depositTypeHandler($event)"
        />
      </div>
      <div>
        <p-button label="Add Envelope" (onClick)="addEnvelopeHandler()"/>
      </div>
      <div>
        <ng-container *ngIf="selectedDeposit$ | async">
          <ng-container *ngFor="let envelopeSchema of envelopeSchemas$ | async">
            <app-envelope [schema]="envelopeSchema"/>
          </ng-container>
        </ng-container>
      </div>
    </div>
  `,
})
export class AddDepositComponent {
  protected repository = inject(DepositRepositoryService);
  protected depositTypeCtrl = new FormControl();

  envelopeSchemas$ = new BehaviorSubject<JsonFormSchema[]>([]);

  selectedDeposit$ = new BehaviorSubject<JsonFormSchema>(undefined!);

  schema$ = this.selectedDeposit$.asObservable().pipe(
    filter(deposit => !!deposit)
  );

  envelopeSchema$ = this.schema$.pipe(map(schema => schema.innerBagRule));

  newEnvelopeSchema = toSignal(this.envelopeSchema$);

  depositTypeHandler(event: DropdownChangeEvent) {
    const deposit = event.value;

    console.debug('deposit selected', deposit);
    this.selectedDeposit$.next(deposit);

    if (this.newEnvelopeSchema()) {
      this.envelopeSchemas$.next([...this.envelopeSchemas$.value, this.newEnvelopeSchema()])
    }
  }

  addEnvelopeHandler() {
    const prevEnvelopes = this.envelopeSchemas$.value;
    this.envelopeSchemas$.next([...prevEnvelopes, this.newEnvelopeSchema()])
  }
}
