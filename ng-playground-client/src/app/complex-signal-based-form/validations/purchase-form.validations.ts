import { create, enforce, only, test } from 'vest';
import { PurchaseFormModel } from '../model/purchase-form.model';

export const purchaseFormValidations = create((model: PurchaseFormModel, field: string) => {
  only(field);
  test('firstName', 'First name is required', () => {
    enforce(model.firstName).isNotBlank();
  });
  test('lastName', 'Last name is required', () => {
    enforce(model.firstName).isNotBlank();
  });
  test('age', 'Age is required', () => {
    enforce(model.firstName).isNotBlank();
  });
  test('gender', 'Gender is required', () => {
    enforce(model.firstName).isNotBlank();
  });

});
