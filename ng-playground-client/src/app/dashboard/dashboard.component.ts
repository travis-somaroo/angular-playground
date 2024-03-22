import { Component } from '@angular/core';
import { DonutWidgetComponent } from '../widgets/donut-widget/donut-widget.component';
import { ColorScheme, DisplayType } from '../widgets/donut-widget/donut-widget.model';
import { AreaWidgetComponent } from '../widgets/area-widget/area-widget.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DonutWidgetComponent,
    AreaWidgetComponent
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

      <div class="col-3">
        <app-area-widget
          [id]="2"
          [title]="'Active Users'"
          [total]="1432"
          [deviation]="-2"
          [series]="{name: 'Active', data: [5,10,2,25,19]}"
          [peakSeries]="{name: 'Peak', data: [25,25,25,25,25]}"
          [labels]="['PEAK', 'ACTIVE']"
        />
      </div>
    </div>
  `
})
export class DashboardComponent {

  protected readonly ColorScheme = ColorScheme;
  protected readonly DisplayType = DisplayType;
}
