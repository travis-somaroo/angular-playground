import { Component, computed, input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ColorScheme, DisplayType, DonutChartConfig } from './donut-widget.model';
import { NgClass, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-donut-widget',
  standalone: true,
  imports: [
    NgApexchartsModule,
    TitleCasePipe,
    NgClass
  ],
  template: `
    <div class="widget-wrapper">
      <div class="widget-header">
        <h5 class="widget-title">{{ title() | titlecase }}</h5>
        @if (id()) {
          <i class="pi pi-arrow-up-right widget-icon" (click)="navigationHandler()"></i>
        }
        <!--TODO: Travis Don't render if not clickable-->
        <div class="flex gap-1 align-items-center ">
          <span class="deviation-text">{{ deviationChange() }}</span>
          <i class="pi text-sm"
             [ngClass]="deviation() > 0 ? 'pi-arrow-circle-up increase' : 'pi-arrow-circle-down decrease'"></i>
        </div>
      </div>
      <div class="widget-content">
        <apx-chart
          [series]="chartConfig().series"
          [labels]="labels()"
          [chart]="chartConfig().chart"
          [legend]="chartConfig().legend"
          [colors]="chartConfig().colors"
          [dataLabels]="chartConfig().dataLabels"
          [plotOptions]="chartConfig().plotOptions"
        ></apx-chart>
      </div>
    </div>
  `
})
export class DonutWidgetComponent {
  id = input.required<number>();
  title = input.required<string>();
  series = input.required<number[]>();
  labels = input.required<string[]>();
  deviation = input<number>();
  displayFormat = input.required<DisplayType>();
  colorScheme = input.required<ColorScheme>();

  protected deviationChange = computed<string>(() => {
    return this.deviation() > 0 ? `+${this.deviation()}%` : `${this.deviation()}%`;
  });

  protected chartConfig = computed<Partial<DonutChartConfig>>(() => ({
    chart: {
      type: 'donut',
      height: 325,
      width: 325,
      offsetX: -20,
      offsetY: 10,
      animations: {
        enabled: true,
        easing: 'easeinout',
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
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 700,
      fontSize: '8px',
      offsetY: -15,
      offsetX: -10,
      width: 150,
      height: 300,
      markers: {
        offsetY: 3,
        offsetX: -5,
        radius: 3
      },
      itemMargin: {
        vertical: 4
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
          size: '90%',
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 5,
              formatter: this.displayType
            },
            value: {
              show: true,
              fontSize: '0.85rem',
              color: '#A3A3A3FF'
            },
            total: {
              show: true,
              showAlways: true,
              fontSize: '1.75rem',
              fontFamily: 'roboto',
              fontWeight: 700,
              color: '#445660FF',
              formatter: this.formatter
            }
          }
        }
      }
    }
  }));

  private formatter = () => this.displayFormat() === DisplayType.CHANGE
    ? (this.deviation() < 0
      ? `${this.deviation()}`
      : `+${this.deviation()}`) : 'AVG';

  private displayType = () => this.displayFormat() === DisplayType.AVERAGE ? `${this.deviation()}%` : `${this.deviation()}`;

  private get colors(): string[] {
    const colorSchemes = {
      [ColorScheme.DULL]: ['#AF144B', '#14329B', '#296143', '#4CA7AB', '#589CD0'],
      [ColorScheme.BLUE_MONO]: ['#03A9F4', '#ABDAF0', '#00618E'],
      [ColorScheme.ORANGE_MONO]: ['#FF5722', '#F5C2B3', '#922200'],
      [ColorScheme.DEFAULT]: ['#4CAF50', '#FFC107', '#FF5722', '#03A9F4', '#FB00FF', '#FF0000']
    };
    return colorSchemes[this.colorScheme()] || colorSchemes[ColorScheme.DEFAULT];
  }

  navigationHandler() {
    // emit id
  }
}
