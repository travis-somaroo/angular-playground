import { Component, input, signal } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ColorScheme, DonutChartConfig } from './donut-chart.model';

@Component({
  selector: 'app-donut-widget',
  standalone: true,
  imports: [
    NgApexchartsModule
  ],
  template: `
    <apx-chart
      [series]="series()"
      [labels]="labels()"
      [chart]="chartConfig().chart"
    ></apx-chart>
  `,
  styles: ``
})
export class DonutWidgetComponent {
  series = input.required<number[]>();
  labels = input.required<string[]>();
  colorScheme = input.required<string>();

  chartConfig = signal<Partial<DonutChartConfig>>({
    chart: {
      type: 'donut',
      animations: {
        enabled: true,
        easing: 'linear',
        speed: 500,
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    series: this.series() ?? [],
    labels: this.labels() ?? [],
    colors: this.colors
  });


  get colors(): string[] {
    const colorSchemes = {
      [ColorScheme.DULL]: ['#AF144B', '#14329B', '#296143', '#4CA7AB', '#589CD0'],
      [ColorScheme.BLUE_MONO]: ['#03A9F4', '#ABDAF0', '#00618E'],
      [ColorScheme.ORANGE_MONO]: ['#FF5722', '#F5C2B3', '#922200'],
      [ColorScheme.DEFAULT]: ['#4CAF50', '#FFC107', '#FF5722', '#03A9F4', '#FB00FF', '#FF0000']
    };
    return colorSchemes[this.colorScheme()] || colorSchemes[ColorScheme.DEFAULT];
  }

}
