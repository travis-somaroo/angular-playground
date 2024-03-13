export type SimpleFormModel = Partial<{
  firstName: string;
  lastName: string;
  age: number;
  emergencyContact: number;
  passwords: Partial<{
    password: string;
    confirmPassword: string;
  }>
}>
