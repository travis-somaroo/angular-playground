import { ControlContainer, FormsModule, NgForm, NgModelGroup } from '@angular/forms';
import { Optional, Provider } from '@angular/core';
import { ControlWrapperComponent } from '../control-wrapper/control-wrapper.component';
import { FormDirective } from '../directives/form.directive';
import { FormModelGroupDirective } from '../directives/form-model-group.directive';
import { FormModelDirective } from '../directives/form-model.directive';

export const formViewProvider: Provider = {
  provide: ControlContainer,
  useFactory: _formViewProviderFactory,
  deps: [
    [new Optional(), NgForm],
    [new Optional(), NgModelGroup]
  ]
};

export function _formViewProviderFactory(
  ngForm: NgForm, ngModelGroup: NgModelGroup
) {
  return ngModelGroup || ngForm || null;
}

export const templateDrivenFormsViewProviders = [
  {provide: ControlContainer, useExisting: NgForm},
  formViewProvider // very important if we want nested components with ngModelGroup
];

export const templateDrivenForms = [ControlWrapperComponent, FormDirective, FormsModule, FormModelDirective, FormModelGroupDirective];
