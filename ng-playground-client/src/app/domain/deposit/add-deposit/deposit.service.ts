import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JsonFormSchema } from '../../../shared/json-form/json-form.model';

@Injectable({
  providedIn: 'root'
})
export class DepositService {
  private depositSelectedSubject = new BehaviorSubject<JsonFormSchema>(undefined!);
  depositSelected$ = this.depositSelectedSubject.asObservable();

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
            max: 0
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
              max: 0
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
              max: 0
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
              max: 0
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
              max: 0
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
            max: 0
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
              max: 0
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
              max: 0
            },
          },
        ],
        maximumInnerBags: 0,
        aggregated: false,
        innerBagRule: undefined
      },
    },
  ];

  setSelectedDeposit(deposit: JsonFormSchema) {
    this.depositSelectedSubject.next(deposit);
  }
}
