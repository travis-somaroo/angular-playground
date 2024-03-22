import { Component, computed, effect, input } from "@angular/core";
import { NgApexchartsModule } from "ng-apexcharts";
import { AreaChartConfig, Series } from "./area-widget.model";

@Component({
  selector: "app-area-widget",
  standalone: true,
  imports: [
    NgApexchartsModule
  ],
  template: `
    <div>
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
  `,
  styles: ``
})
export class AreaWidgetComponent {
  series = input.required<Series>();
  peakSeries = input.required<Series>();
  labels = input.required<string[]>();

  constructor() {
    effect(() => {
      console.log(this.peakSeries());
    });
  }

  protected chartConfig = computed<Partial<AreaChartConfig>>(() => ({
    series: [
      {
        name: this.series().name,
        type: "area",
        data: this.series().data ?? [],
      },
      {
        name: this.peakSeries().name,
        type: "line",
        data: this.peakSeries().data ?? [],
        color: "#216A89"
      }
    ],
    chart: {
      type: "line",
      height: 100,
      width: 325,
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
      colors: ["#03A8F2"],
      dashArray: [0, 5],
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
      opacity: 0.4,
    },
    tooltip: {
      enabled: false
    }
  }));

  private categories(data: number[], name: string): string[] {
    return data.map(() => name.toUpperCase());
  }
}
