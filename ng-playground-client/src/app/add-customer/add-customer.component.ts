import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';
import { ValidationFeedbackComponent } from '../validation-feedback/validation-feedback.component';
import { ValidationFeedbackDirective } from '../directives/validation-feedback.directive';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ChipsModule,
    ValidationFeedbackComponent,
    ValidationFeedbackDirective,
    CalendarModule,
  ],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.scss'
})
export class AddCustomerComponent {
  private fb = inject(FormBuilder);

  newCustomerForm = this.fb.group({
    firstName: [null, [Validators.required, Validators.email]],
    lastName: ["So", [Validators.required, Validators.minLength(5)]],
    dob: [null, [Validators.required]],
  });
}
