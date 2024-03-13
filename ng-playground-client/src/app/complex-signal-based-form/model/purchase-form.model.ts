export type PurchaseFormModel = Partial<{
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | 'other';
  genderOther?: string;
  age: number;
  emergencyContactNumber: string;
  addresses: Partial<{
    billingAddress: AddressFormModel;
    shippingAddress: AddressFormModel;
    shippingAddressDifferentFromBillingAddress: boolean;
  }>;
}>;


export type AddressFormModel = Partial<{
  street: string;
  number: string;
  city: string;
  zipcode: string;
  country: string;
}>
