import { ControlContainer, NgForm, NgModelGroup } from '@angular/forms';
import { Optional, Provider } from '@angular/core';

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
