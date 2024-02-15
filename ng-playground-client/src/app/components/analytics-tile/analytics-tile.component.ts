import { Component, input, ViewChild } from '@angular/core';
import { ChartOptions, ChartType } from './analytics-tile';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-analytics-tile',
  standalone: true,
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './analytics-tile.component.html',
  styleUrl: './analytics-tile.component.scss'
})
export class AnalyticsTileComponent {
  @ViewChild(ChartComponent) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  name = input<string>();
  chartType = input<ChartType>();
  data = input<any[]>();

  constructor() {
    this.chartOptions = {
      series: [
        {
          data: [25, 20, 15, 12, 10, 12]
        },
      ],
      chart: {
        type: 'bar',
        height: 200,
        toolbar: {
          show: false
        },
      },
      colors: [
        "#026591",
        "#03a8f2",
        "#b2e3fa",
        "#e5f6fe",
        "#c4cacd",
      ],
      plotOptions: {
        bar: {
          distributed: true,
          horizontal: true
        },
      },
      stroke: {
        width: 0.75,
        colors: ["#fff"]
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      xaxis: {
        labels: {
          show: true,
          formatter: function(val) {
            return Math.abs(Math.round(parseInt(val, 10))) + "%";
          }
        },
      },
      grid: {
        borderColor: '#eaeced',
        xaxis: {
          lines: {
            show: true,
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      legend: {
        show: false
      },
      tooltip: {
        theme: "dark",
        x: {
          show: false
        },
        y: {
          title: {
            formatter: () => ""
          }
        }
      }
    };
  }
}
