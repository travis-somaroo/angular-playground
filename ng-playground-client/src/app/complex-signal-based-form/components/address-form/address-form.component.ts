import { Component, Input } from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { formViewProvider } from '../../functions/view-provider';
import { InputTextModule } from 'primeng/inputtext';
import { AddressFormModel } from '../../model/purchase-form.model';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule
  ],
  templateUrl: './address-form.component.html',
  viewProviders: [
    {provide: ControlContainer, useExisting: NgForm},
    formViewProvider // very important if we want nested components with ngModelGroup
  ]
})
export class AddressFormComponent {
  @Input() address?: AddressFormModel | null;
}
