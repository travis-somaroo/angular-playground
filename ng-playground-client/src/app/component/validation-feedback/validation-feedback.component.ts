import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-feedback',
  standalone: true,
  imports: [],
  template: `
    @if (errorMessage) {
      <small class="text-red-500">{{ errorMessage }}</small>
    }
  `
})
export class ValidationFeedbackComponent {
  @Input() control: AbstractControl;
  @Input() label: string;

  get errorMessage(): string | null {
    if (this.control && this.control.touched) {
      for (const error in this.control.errors) {
        if (this.control.errors.hasOwnProperty(error)) {
          return this.getErrorMessage(error, this.control.errors[error]);
        }
      }
    }
    return null;
  }

  private getErrorMessage(propertyName: string, validatorValue?: any): string {
    const errorMessages = {
      required: `${this.label} is required`,
      minlength: `Minimum length ${validatorValue['requiredLength']}`,
      maxlength: `Maximum length ${validatorValue['requiredLength']}`,
      email: `${this.label} must be a valid email address`
    };

    return errorMessages[propertyName];
  }

}
