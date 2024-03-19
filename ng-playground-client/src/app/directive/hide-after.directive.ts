import { Directive, Input, input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { HideAfterContext } from './hide-after-context';


@Directive({
  selector: '[hideAfter]',
  standalone: true
})
export class HideAfterDirective implements OnInit {

  //Need to name the input the same name as the directive if we want to pass a value to it.
  @Input({alias: 'hideAfter'})
  set delay(value: number | null) {
    this._delay = value ?? 0;
    this.context.hideAfter = this.context.counter = this._delay / 1000;
  }

  private _delay = 0;

  //Add another input but the name must be a prefix of the selector.
  placeholder = input<TemplateRef<any>>(undefined!, {alias: 'hideAfterThen'});


  // Content property must match the input alias.
  private context = new HideAfterContext();

  constructor(
    private viewContainerRef: ViewContainerRef,
    private template: TemplateRef<any>
  ) {
  }

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template, this.context);

    const interval = setInterval(() => {
      this.context.counter--;
    }, 1000);

    setTimeout(() => {
      this.viewContainerRef.clear();
      if (this.placeholder()) {
        // Add the variable context in the embedded view.
        this.viewContainerRef.createEmbeddedView(this.placeholder(), this.context);
      }
      clearInterval(interval)
    }, this._delay);
  }


}
