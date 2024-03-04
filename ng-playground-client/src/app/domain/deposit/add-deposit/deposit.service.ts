import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, shareReplay } from 'rxjs';
import { JsonFormSchema } from '../../../shared/json-form/json-form.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class DepositService {
  private innerBagSchemas = new BehaviorSubject<JsonFormSchema[]>([]);
  innerBagSchemas$ = this.innerBagSchemas.asObservable();

  private depositSelectedSubject = new BehaviorSubject<JsonFormSchema>(undefined!);
  depositSelected$ = this.depositSelectedSubject.asObservable().pipe(
    filter(d => !!d)
  );

  schema$: Observable<JsonFormSchema> = this.depositSelected$.pipe(
    filter(s => !!s),
    shareReplay(1)
  );

  private newSchema = toSignal(this.schema$.pipe(map(s => s.innerBagRule)));

  readonly depositTypes: any[] = [
    {
      id: 2,
      name: "SBSA Cash Upload",
      code: "SBSA_CASH_UPLOAD",
      deleted: false,
      maximumInnerBags: 3,
      aggregated: false,
      propertyRules: [
        {
          propertyName: "bagID",
          displayName: "Outer Bag ID",
          defaultValue: "",
          type: "text",
          validators: {
            required: true,
            min: null,
            max: 10000
          },
        },
      ],
      innerBagRule: {
        id: 2,
        name: "SBSA Cash Upload",
        code: "SBSA_CASH_UPLOAD",
        deleted: false,
        propertyRules: [
          {
            propertyName: "envelopeID",
            displayName: "Envelope ID",
            defaultValue: "",
            type: "text",
            validators: {
              required: true,
              min: null,
              max: 10000
            },
          },
          {
            propertyName: "envelopeID",
            displayName: "Envelope ID",
            defaultValue: "",
            type: "text",
            validators: {
              required: true,
              min: null,
              max: 10000
            },
          },
          {
            propertyName: "depositID1",
            displayName: "Store Number",
            defaultValue: "",
            type: "text",
            validators: {
              required: true,
              min: null,
              max: 10000
            },
          },
          {
            propertyName: "depositID3",
            displayName: "Account Name",
            defaultValue: "",
            type: "text",
            validators: {
              required: true,
              min: null,
              max: 10000
            },
          },
        ],
        innerBagRule: undefined,
        maximumInnerBags: 0,
        aggregated: false
      },
    },
    {
      id: 3,
      name: "ABC Cash Upload",
      code: "ABC_CASH_UPLOAD",
      deleted: false,
      maximumInnerBags: 5,
      aggregated: true,
      propertyRules: [
        {
          propertyName: "bagID",
          displayName: "Outer Bag ID",
          defaultValue: "",
          type: "text",
          validators: {
            required: true,
            min: null,
            max: 10000
          },
        },
        {
          propertyName: "totalAmount",
          displayName: "Total Amount",
          defaultValue: "0",
          type: "number",
          validators: {
            required: true,
          },
        },
      ],
      innerBagRule: {
        id: 3,
        name: "ABC Cash Upload",
        code: "ABC_CASH_UPLOAD",
        deleted: false,
        propertyRules: [
          {
            propertyName: "envelopeID",
            displayName: "Envelope ID",
            defaultValue: "",
            type: "text",
            validators: {
              required: true,
              min: null,
              max: 10000
            },
          },
          {
            propertyName: "storeId",
            displayName: "Store ID",
            defaultValue: "",
            type: "text",
            validators: {
              required: true,
              min: null,
              max: 10000
            },
          },
          {
            propertyName: "amount",
            displayName: "Amount",
            defaultValue: "0",
            type: "number",
            validators: {
              required: true,
            },
          },
        ],
        maximumInnerBags: 1,
        aggregated: false,
        innerBagRule: undefined
      },
    },
  ];

  get innerBagSize() {
    return this.innerBagSchemas.getValue().length;
  }

  setSelectedDeposit(deposit: JsonFormSchema) {
    console.log(deposit);
    this.innerBagSchemas.next([]);
    this.depositSelectedSubject.next(deposit);

    const innerBagRule = deposit.innerBagRule;
    if (innerBagRule) {
      const updatedInnerBagSchemas = [...this.innerBagSchemas.getValue(), innerBagRule];
      this.innerBagSchemas.next(updatedInnerBagSchemas);
    }
  }

  addInnerBagSchema() {
    const currentSchemas = this.innerBagSchemas.value;
    this.innerBagSchemas.next([...currentSchemas, this.newSchema()]);
  }

  removeInnerBagSchema() {
    const currentSchemas = this.innerBagSchemas.value;
    currentSchemas.pop();
    this.innerBagSchemas.next([...currentSchemas]);
  }
}
