import { Component } from '@angular/core';
import { DonutWidgetComponent } from '../donut-widget/donut-widget.component';
import { ColorScheme, DisplayType } from '../donut-widget/donut-chart.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DonutWidgetComponent
  ],
  template: `
    <div>
      <app-donut-widget
        [series]="[132,254,99,112]"
        [deviation]="2"
        [labels]="['IN SLA', 'APPROACHING', 'OUT OF SLA', 'PAUSED']"
        [colorScheme]="ColorScheme.DEFAULT"
        [displayFormat]="DisplayType.AVERAGE"
      />
    </div>
  `
})
export class DashboardComponent {
  // ! Stefan/Richard The api needs to send through the inputs and chart type to render.
  protected readonly ColorScheme = ColorScheme;
  protected readonly DisplayType = DisplayType;
}
