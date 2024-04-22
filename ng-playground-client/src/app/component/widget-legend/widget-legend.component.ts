import { Component, input } from '@angular/core';
import { NgClass, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-widget-legend',
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    NgIf
  ],
  template: `
<!--    <div class="flex gap-1 align-items-center justify-content-center">-->
<!--      &lt;!&ndash;  TODO: Use a const &ndash;&gt;-->
<!--      @if (label() !== 'PEAK') {-->
<!--        <div class="marker" [ngStyle]="{'background-color': color()}"></div>-->
<!--      } @else {-->
<!--        <i class="pi pi-ellipsis-h"></i>-->
<!--      }-->
<!--      <p>{{ label() }}</p>-->
<!--    </div>-->
  `,
  styles: `
    .marker {
      width: 12px;
      height: 12px;
      border-radius: 4px;
    }

    p {
      margin: 0;
      font-size: 0.75rem;
    }

    i {
      color: #014866;
    }
  `
})
export class WidgetLegendComponent {
  label = input.required<string>();
  color = input.required<string>();
  deviation = input<number>();
}
