import { Component, computed, input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ColorScheme, DisplayType, DonutChartConfig } from './donut-chart.model';

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
      [legend]="chartConfig().legend"
      [colors]="chartConfig().colors"
      [dataLabels]="chartConfig().dataLabels"
      [plotOptions]="chartConfig().plotOptions"
    ></apx-chart>
  `,
  styles: ``
})
export class DonutWidgetComponent {

  series = input.required<number[]>();
  deviation = input<number>();

  // TODO - Travis group the template config
  labels = input.required<string[]>();
  colorScheme = input.required<ColorScheme>();
  displayFormat = input<DisplayType>();

  formatter = () => this.displayFormat() === DisplayType.CHANGE
    ? (this.deviation() < 0
      ? `${this.deviation()}`
      : `+${this.deviation()}`) : 'AVG';

  displayType = () => this.displayFormat() === DisplayType.AVERAGE ? `${this.deviation()}%` : `${this.deviation()}`;

  chartConfig = computed<Partial<DonutChartConfig>>(() => ({
    chart: {
      type: 'donut',
      height: '300',
      width: '300',
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
    colors: this.colors,
    legend: {
      fontFamily: 'roboto',
      fontWeight: '700',
      fontSize: '1rem',
      offsetY: -15,
      offsetX: 5,
      width: 150,
      height: 300,
      markers: {
        offsetY: 3,
        offsetX: -5,
        radius: 4
      }
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      pie: {
        customScale: 1,
        donut: {
          background: 'transparent',
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 5,
              formatter: this.displayType
            },
            value: {
              show: true,
              fontSize: '0.65rem',
              color: '#A3A3A3FF'
            },
            total: {
              show: true,
              showAlways: true,
              fontSize: '1.25rem',
              fontFamily: 'roboto',
              fontWeight: '700',
              color: '#445660FF',
              formatter: this.formatter
            }
          }
        }
      }
    }
  }));

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
