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
    <div class="grid">
      <div class="col-3">
        <app-donut-widget
          [id]="1"
          [title]="'Case Management'"
          [series]="[23,56,34,12]"
          [labels]="['IN SLA', 'OUT OF SLA', 'APPROACHING SLA', 'IN PROGRESS']"
          [deviation]="2"
          [colorScheme]="ColorScheme.DEFAULT"
          [displayFormat]="DisplayType.AVERAGE"
        />
      </div>
    </div>
  `
})
export class DashboardComponent {

  protected readonly ColorScheme = ColorScheme;
  protected readonly DisplayType = DisplayType;
}
