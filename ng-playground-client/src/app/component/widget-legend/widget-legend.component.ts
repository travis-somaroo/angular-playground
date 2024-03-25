import { Component, input } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-widget-legend',
  standalone: true,
  imports: [
    NgClass,
    NgStyle
  ],
  template: `
    <div class="flex gap-2 align-items-center">
      @if (label() !== 'PEAK') {
        <div class="marker" [ngStyle]="{'background-color': color()}"></div>
      } @else {
        <i class="pi pi-ellipsis-h"></i>
      }
      <p class="text-xs">{{ label() }}</p>
    </div>
  `,
  styles: `
    .marker {
      width: 12px;
      height: 12px;
      border-radius: 4px;
    }
  `
})
export class WidgetLegendComponent {
  label = input.required<string>();
  color = input.required<string>();
  deviation = input<number>();
}
