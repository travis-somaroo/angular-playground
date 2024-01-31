import { Directive, ElementRef, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ValidationFeedbackComponent } from '../validation-feedback/validation-feedback.component';
import { FormGroupDirective } from '@angular/forms';

@Directive({
  selector: '[appValidationFeedback]',
  standalone: true
})
export class ValidationFeedbackDirective implements OnInit {
  @Input()
  label!: string;

  constructor(
    private elRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private formGroupDirective: FormGroupDirective
  ) {
  }

  ngOnInit() {
    const formGroup = this.formGroupDirective.form;
    const formControlName = this.elRef.nativeElement.getAttribute('formControlName');

    const control = formGroup.get(formControlName);
    const minLength = control && control.hasError('minlength') ? control.errors['minlength']['requiredLength'] : null;

    const componentRef = this.viewContainerRef.createComponent(ValidationFeedbackComponent);
    const componentInstance = componentRef.instance;

    componentInstance.label = this.label;
    componentInstance.minValue = minLength;
    componentInstance.formGroup = formGroup;
    componentInstance.controlName = formControlName;
  }
}
