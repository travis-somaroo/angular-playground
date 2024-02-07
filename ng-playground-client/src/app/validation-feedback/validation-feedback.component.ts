import { Component, inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslationService } from '../add-customer/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { KeyValuePipe, NgForOf, NgIf, TitleCasePipe } from '@angular/common';
import { min } from 'rxjs';

@Component({
  selector: 'app-validation-feedback',
  standalone: true,
  imports: [
    TranslateModule,
    TitleCasePipe,
    KeyValuePipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './validation-feedback.component.html',
  styleUrl: './validation-feedback.component.scss'
})
export class ValidationFeedbackComponent {
  private translationService = inject(TranslationService);

  @Input()
  public formGroup!: FormGroup;

  @Input()
  public controlName!: string;

  @Input()
  public label!: string;

  public minValue: number;

  public validationKey(key: string) {
    return `errors.${key}`;
  }
}
