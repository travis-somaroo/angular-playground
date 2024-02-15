import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-ng-reactive-form',
  standalone: true,
  imports: [
    RadioButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    NgIf,
    JsonPipe
  ],
  templateUrl: './ng-reactive-form.component.html',
})
export class NgReactiveFormComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    gender: [],
    otherGender: [],
    address: this.fb.group({
      street: []
    })
  });

  get isOtherGender() {
    return this.form.controls.gender.value === 'other';
  }
}
