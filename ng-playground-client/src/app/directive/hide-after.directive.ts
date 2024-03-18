import { Directive, input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[hideAfter]',
  standalone: true
})
export class HideAfterDirective implements OnInit {

  //Need to name the input the same name as the directive if we want to pass a value to it.
  delay = input<number>(0, {alias: 'hideAfter'});

  //Add another input but the name must be a prefix of the selector.
  placeholder = input<TemplateRef<any>>(undefined!, {alias: 'hideAfterThen'});

  constructor(
    private viewContainerRef: ViewContainerRef,
    private template: TemplateRef<any>
  ) {
  }

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template);
    setTimeout(() => {
      this.viewContainerRef.clear();
      if (this.placeholder()) {
        this.viewContainerRef.createEmbeddedView(this.placeholder());
      }
    }, this.delay());
  }


}
