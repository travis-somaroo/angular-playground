import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ValidationFeedbackComponent } from './component/validation-feedback/validation-feedback.component';
import { FeedbackDirective } from './directive/feedback.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, InputTextModule, ValidationFeedbackComponent, FeedbackDirective],
  template: `
    <div class="grid col-offset-4">
      <div class="col-4" [formGroup]="customerSignupForm">
        <div class="field flex flex-column gap-3">
          <label>Email</label>
          <input pInputText formControlName="email" feedback controlLabel="Email"/>
        </div>
        <div class="field flex flex-column gap-3">
          <label>Password</label>
          <input pInputText formControlName="password" feedback controlLabel="Password">
        </div>
        <div class="field flex flex-column gap-3">
          <label>Confirm Password</label>
          <input pInputText formControlName="confirmPassword" feedback controlLabel="Confirm Password">
        </div>
      </div>
    </div>
  `
})
export class AppComponent {
  private fb = inject(FormBuilder);
  customerSignupForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
    confirmPassword: [null, [Validators.required]]
  });

}
