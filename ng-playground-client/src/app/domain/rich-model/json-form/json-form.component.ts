import { JsonFormControls, JsonFormSchema } from './json-form.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject, Input,
  input, OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-json-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    CalendarModule,
    InputTextModule,
    InputNumberModule,
    ReactiveFormsModule
  ],
  templateUrl: './json-form.component.html',
})
export class JsonFormComponent implements OnChanges {
  @Input()
  formSchema!: Partial<JsonFormSchema>;

  formGroup!: FormGroup;

  private fb = inject(FormBuilder);

  ngOnChanges(changes: SimpleChanges): void {
    if ('formSchema' in changes) {
      this.initForm(this.formSchema?.propertyRules);
    }
  }

  private initForm(controls: JsonFormControls[]) {
    this.formGroup = this.fb.group({});
    if (controls) {
      for (const control of controls) {
        const validatorsToAdd = [];
        for (const [key, value] of Object.entries(control.validators)) {
          switch (key) {
            case 'min':
              validatorsToAdd.push(Validators.min(value));
              break;
            case 'max':
              validatorsToAdd.push(Validators.max(value));
              break;
            case 'required':
              if (value) {
                validatorsToAdd.push(Validators.required);
              }
              break;
          }
        }
        this.formGroup.addControl(control.propertyName, this.fb.control(control.defaultValue, validatorsToAdd));
      }
    }
  }
}