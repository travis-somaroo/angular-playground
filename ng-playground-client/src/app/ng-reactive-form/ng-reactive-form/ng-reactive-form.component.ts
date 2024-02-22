import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { JsonPipe, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-ng-reactive-form',
  standalone: true,
  imports: [
    RadioButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    NgIf,
    JsonPipe,
    ButtonModule
  ],
  templateUrl: './ng-reactive-form.component.html',
})
export class NgReactiveFormComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    gender: [],
    otherGender: [null,[Validators.required]],
  });

  get isOtherGender() {
    return this.form.controls.gender.value === 'other';
  }

  submitHandler() {
    console.log(this.form.getRawValue());
  }
}
