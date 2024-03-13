import { Component, ContentChild, HostBinding, inject } from '@angular/core';
import { NgModel, NgModelGroup } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: '[appControlWrapper]',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  template: `
    <div class="input-wrapper__content">
      <ng-content></ng-content>
    </div>
    <div class="input-wrapper__errors">
      <ul *ngIf="!ngModelGroup && ngModel?.control?.errors && ngModel?.touched">
        <li *ngFor="let error of ngModel?.control?.errors?.['errors']">{{error}}</li>
      </ul>

      <ul *ngIf="ngModelGroup?.control?.errors && ngModelGroup?.touched">
        <li *ngFor="let error of ngModelGroup?.control?.errors?.['errors']">{{error}}</li>
      </ul>
    </div>
  `,
  styles: `
    .input-wrapper__errors {
      margin-top: 8px;

      li {
        list-style-type: none;
        color: #e31919;
        font-weight: 400;
      }

      ul {
        padding: 0;
        margin: 0;
      }
    }

    :host {
      display: flex;
      width: 100%;
      flex-direction: column;
      padding-bottom: 8px;
    }

  `
})
export class ControlWrapperComponent {
  @ContentChild(NgModel) public ngModel?: NgModel;
  readonly ngModelGroup: NgModelGroup | null = inject(NgModelGroup, {
    optional: true,
    self: true
  });

  @HostBinding('class.input-wrapper--invalid')
  get invalid() {
    return (!this.ngModelGroup && this.ngModel?.control?.errors && this.ngModel?.touched)
      || (this.ngModelGroup?.control?.errors && this.ngModelGroup.touched);

  }
}
