import { Component, inject } from '@angular/core';
import { EnvelopeComponent } from '../envelope/envelope.component';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { DepositRepositoryService } from '../deposit-repository.service';
import { BehaviorSubject, filter, map } from 'rxjs';
import { JsonFormSchema } from '../json-form/json-form.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Envelope } from '../envelope/envelope';

@Component({
  selector: 'app-add-deposit',
  standalone: true,
  imports: [
    EnvelopeComponent,
    DropdownModule,
    AsyncPipe,
    ReactiveFormsModule,
    NgIf
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
        <ng-container *ngIf="selectedDeposit$ | async">
          <app-envelope [schema]="envelopeSchema$ | async" (envelopeEvent)="envelopeEventHandler($event)"/>
        </ng-container>
      </div>
    </div>
  `,
  styles: ``
})
export class AddDepositComponent {
  protected repository = inject(DepositRepositoryService);

  depositTypeCtrl = new FormControl();

  selectedDeposit$ = new BehaviorSubject<JsonFormSchema>(undefined!);

  schema$ = this.selectedDeposit$.asObservable().pipe(
    filter(deposit => !!deposit)
  );
  envelopeSchema$ = this.schema$.pipe(map(schema => schema.innerBagRule));

  depositTypeHandler(event: DropdownChangeEvent) {
    this.selectedDeposit$.next(event.value);
  }

  envelopeEventHandler(envelope: Envelope) {
    console.log('envelope', envelope);
  }
}
