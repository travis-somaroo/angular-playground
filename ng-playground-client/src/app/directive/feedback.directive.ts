import { Directive, ElementRef, input, OnInit, ViewContainerRef } from '@angular/core';
import { ValidationFeedbackComponent } from '../component/validation-feedback/validation-feedback.component';
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms';

const CONTROL_NAME = 'formControlName';

@Directive({
  selector: '[feedback]',
  standalone: true
})
export class FeedbackDirective implements OnInit {
  label = input<string>('', {alias: 'controlLabel'});

  constructor(
    private ref: ElementRef,
    private vcf: ViewContainerRef,
    private directive: FormGroupDirective
  ) {
  }

  ngOnInit() {
    const form: FormGroup = this.directive.form;
    const controlName: string = this.ref.nativeElement.getAttribute(CONTROL_NAME);
    const abstractControl: AbstractControl = form.get(controlName);
    const componentInstance = this.vcf.createComponent(ValidationFeedbackComponent).instance;

    componentInstance.control = abstractControl;
    componentInstance.label = this.getLabel() || this.label();
  }

  private getLabel(): string {
    const controlId = this.ref.nativeElement.getAttribute('id');
    const labelElement = controlId ? document.querySelector(`label[for='${controlId}']`) as HTMLElement : null;
    return labelElement ? labelElement.innerText.trim() : '';
  }
}
