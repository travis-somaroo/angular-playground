import { Component, Input } from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { formViewProvider } from '../functions/view-provider';
import { InputTextModule } from 'primeng/inputtext';

export type AddressFormModel = Partial<{
  street: string;
  number: string;
  city: string;
  zipcode: string;
  country: string;
}>

// Important if we want nested components with ngModelGroup
export const templateDrivenFormsViewProviders = [
  {
    provide: ControlContainer,
    useExisting: NgForm
  },
  formViewProvider
];

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule
  ],
  templateUrl: './address-form.component.html',
  viewProviders: [templateDrivenFormsViewProviders],
})
export class AddressFormComponent {
  @Input() address?: AddressFormModel | null;
}
