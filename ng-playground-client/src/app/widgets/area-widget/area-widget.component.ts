import { Component, computed, input } from "@angular/core";
import { NgApexchartsModule } from "ng-apexcharts";
import { AreaChartConfig, Series } from "./area-widget.model";
import { NgClass, TitleCasePipe } from '@angular/common';
import { WidgetLegendComponent } from '../../component/widget-legend/widget-legend.component';

@Component({
  selector: "app-area-widget",
  standalone: true,
  imports: [
    NgApexchartsModule,
    TitleCasePipe,
    NgClass,
    WidgetLegendComponent
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
        <div class="">
          <span class="total">{{ total() }}</span>
        </div>
        <apx-chart
          [series]="chartConfig().series"
          [labels]="labels()"
          [chart]="chartConfig().chart"
          [stroke]="chartConfig().stroke"
          [colors]="chartConfig().colors"
          [dataLabels]="chartConfig().dataLabels"
          [yaxis]="chartConfig().yaxis"
          [xaxis]="chartConfig().xaxis"
          [legend]="chartConfig().legend"
          [fill]="chartConfig().fill"
          [grid]="chartConfig().grid"
          [tooltip]="chartConfig().tooltip"
        ></apx-chart>
      </div>
      <div class="widget-footer">
        @for (label of labels(); track label) {
          <app-widget-legend [label]="label" [color]="'#03a8f2'"/>
        }
      </div>
    </div>

  `,
  styles: `
    .widget-footer {
      height: 2rem;
      display: flex;
      gap: 1rem;
    }
  `
})
export class AreaWidgetComponent {
  id = input.required<number>();
  title = input.required<string>();

  total = input.required<number>();
  deviation = input.required<number>();
  series = input.required<Series>();
  peakSeries = input.required<Series>();
  labels = input.required<string[]>();

  protected chartConfig = computed<Partial<AreaChartConfig>>(() => ({
    series: [
      {
        name: this.series().name,
        type: "area",
        data: this.series().data ?? []
      },
      {
        name: this.peakSeries().name,
        type: "line",
        data: this.peakSeries().data ?? [],
        color: "#014866"
      }
    ],
    chart: {
      type: "line",
      height: 100,
      width: 300,
      offsetY: 5,
      offsetX: -24,
      stacked: false,
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: false
      },
      background: "transparent"
    },
    colors: ["#A7DFF9"],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth",
      width: 1.5,
      colors: ["#03a7f0"],
      dashArray: [0, 3]
    },
    labels: this.labels() ?? [],
    xaxis: {
      labels: {
        show: false
      },
      categories: this.categories(this.series().data, this.series().name)
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    legend: {
      show: false
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      }
    },
    fill: {
      opacity: 0.4
    },
    tooltip: {
      enabled: false
    }
  }));

  private categories(data: number[], name: string): string[] {
    return data.map(() => name.toUpperCase());
  }

  navigationHandler() {

  }
}
