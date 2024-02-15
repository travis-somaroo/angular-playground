import { Component, computed, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';
import { FormDirective } from '../directives/form.directive';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AddressFormComponent } from '../address-form/address-form.component';
import { CheckboxModule } from 'primeng/checkbox';

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

@Component({
  selector: 'app-my-form',
  standalone: true,
  imports: [
    ButtonModule,
    JsonPipe,
    FormsModule,
    FormDirective,
    InputTextModule,
    RadioButtonModule,
    AddressFormComponent,
    CheckboxModule,
    NgIf,
  ],
  templateUrl: './my-form.component.html',
})
export class MyFormComponent {
  protected readonly formValue = signal<PurchaseFormModel>({});

  protected readonly viewModel = computed(() => ({
      formValue: this.formValue(),
      showOtherGender: this.formValue().gender === 'other',
      showShippingAddress: this.formValue().addresses?.shippingAddressDifferentFromBillingAddress,
      emergencyContactDisabled:
        this.formValue().age === 0 || this.formValue().age > 17
    })
  );

  get vm() {
    return this.viewModel();
  }

  submitHandler() {
    console.log(this.formValue());
  }

  onSetForm(event: any) {
    console.log(event);
    this.formValue.set(event);
  }
}
