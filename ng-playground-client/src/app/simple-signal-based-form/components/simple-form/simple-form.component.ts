import { Component, signal } from '@angular/core';
import { templateDrivenForms } from '../../infrastructure/functions/template-driven.forms';
import { simpleFormValidations } from '../../validations/simple-form.validations';
import { SimpleFormModel } from '../../model/simple-form.model';
import { ChipsModule } from 'primeng/chips';
import { InputNumberModule } from 'primeng/inputnumber';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-simple-form',
  standalone: true,
  imports: [templateDrivenForms, ChipsModule, InputNumberModule, JsonPipe],
  templateUrl: './simple-form.component.html',
  styleUrl: './simple-form.component.scss'
})
export class SimpleFormComponent {
  suite = simpleFormValidations;
  formValue = signal<SimpleFormModel>({});
}
