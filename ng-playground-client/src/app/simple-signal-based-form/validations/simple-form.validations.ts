import { create, enforce, omitWhen, only, test } from 'vest';
import { SimpleFormModel } from '../model/simple-form.model';

export const simpleFormValidations = create((model: SimpleFormModel, field: string) => {
  only(field);

  test('firstName', 'First name is required', () => {
    enforce(model.firstName).isNotBlank();
  });
  test('lastName', 'Last name is required', () => {
    enforce(model.lastName).isNotBlank();
  });
  test('age', 'Age is required', () => {
    enforce(model.age).isNotBlank();
  });
  omitWhen((model.age || 0) >= 18, () => {
    test('emergencyContact', 'Emergency contact is required', () => {
      enforce(model.emergencyContact).isNotBlank();
    });
  });
  test('passwords.password', 'Password is required', () => {
    enforce(model.passwords?.password).isNotBlank();
  });
  omitWhen(!model.passwords?.password, () => {
    test('passwords.confirmPassword', 'Confirm password is required', () => {
      enforce(model.passwords?.confirmPassword).isNotBlank();
    });
  });
  omitWhen(!model.passwords?.password || !model.passwords.confirmPassword, () => {
    test('passwords', 'Passwords should match', () => {
      enforce(model.passwords?.password).equals(model.passwords?.confirmPassword);
    });
  });
});
