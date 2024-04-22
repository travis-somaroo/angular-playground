import { Component, computed, input } from '@angular/core';
import { Series } from '../series.model';
import { BarChartConfig } from './bar-chart-widget.model';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgClass, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-bar-chart-widget',
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
      </div>
      <div class="widget-content">
        <div class="flex align-items-center gap-2">
          <span class="total">{{ total() }}</span>
          <span class="deviation-text flex flex-column">
            <i class="pi"
               [ngClass]="deviation() > 0 ? 'pi-arrow-circle-up increase' : 'pi-arrow-circle-down decrease'"></i>
            <small>{{ deviation() }}</small>
          </span>
        </div>
        <apx-chart
          [series]="chartConfig().series"
          [chart]="chartConfig().chart"
          [plotOptions]="chartConfig().plotOptions"
          [dataLabels]="chartConfig().dataLabels"
          [yaxis]="chartConfig().yaxis"
          [xaxis]="chartConfig().xaxis"
          [stroke]="chartConfig().stroke"
        ></apx-chart>
      </div>
    </div>
  `,
  styles: ``
})
export class BarChartWidgetComponent {
  id = input.required<number>();
  title = input.required<string>();
  total = input.required<number>();
  deviation = input.required<number>();
  series = input.required<Series>();
  peakSeries = input.required<Series>();
  labels = input<string[]>();

  protected chartConfig = computed<Partial<BarChartConfig>>(() => ({
    series: [
      {
        name: this.peakSeries().name,
        data: this.peakSeries().data ?? [],
        color: '#015479'
      },
      {
        name: this.series().name,
        data: this.series().data ?? [],
        color: '#03a8f2'
      }
    ],
    chart: {
      type: 'bar',
      offsetX: -22,
      offsetY: -10,
      height: 100,
      width: 300,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 3,
        borderRadiusApplication: 'end'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['#fff'],
    },
    xaxis: {
      categories: [''],
      labels: {
        show: false
      },
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false,
        color: '#d5d5d5',
        offsetX: -2,
        offsetY: -1
      }
    },
    yaxis: {}
  }));

  navigationHandler() {
    // emit id
  }

}
