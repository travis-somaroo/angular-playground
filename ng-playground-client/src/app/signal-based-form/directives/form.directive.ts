import { Directive, inject, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Directive({
  selector: 'form',
  standalone: true
})
export class FormDirective {
  private readonly ngForm = inject(NgForm, {self: true});
  // The NgForm directive subscribes to value changes on our behalf
  @Output() formValueChange = this.ngForm.form.valueChanges.pipe(
    debounceTime(0)
  );

}
