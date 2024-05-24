import { Component, computed, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';
import { FormDirective } from '../../directives/form.directive';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AddressFormComponent } from '../address-form/address-form.component';
import { CheckboxModule } from 'primeng/checkbox';
import { PurchaseFormModel } from '../../model/purchase-form.model';


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
    NgIf
  ],
  templateUrl: './my-form.component.html'

})
export class MyFormComponent {
  private readonly formValue = signal<PurchaseFormModel>({});
  private readonly shippingAddress = signal(null);

  readonly editMode = signal(false);

  readonly viewModel = computed(() => ({
      formValue: this.formValue(),
      showShippingAddress:
      this.formValue().addresses?.shippingAddressDifferentFromBillingAddress,
      showOtherGender: this.formValue().gender === 'other',
      emergencyContactDisabled:
        this.formValue().age === 0 || this.formValue().age > 17,
      shippingAddress: this.formValue().addresses?.shippingAddress || this.shippingAddress()
    })
  );

  get vm() {
    return this.viewModel();
  }

  submitHandler() {
    console.log(this.formValue());
  }

  setFormValue(event: PurchaseFormModel) {
    this.formValue.set(event);
    if (event.addresses?.shippingAddress) {
      this.shippingAddress.set(event.addresses?.shippingAddress);
    }
  }
}

