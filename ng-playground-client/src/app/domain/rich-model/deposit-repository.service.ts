import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepositRepositoryService {

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
}
