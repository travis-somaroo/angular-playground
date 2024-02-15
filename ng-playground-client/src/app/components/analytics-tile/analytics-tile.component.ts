import { Component, input, ViewChild } from '@angular/core';
import { ChartOptions, ChartType } from './analytics-tile';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-analytics-tile',
  standalone: true,
  imports: [
    NgApexchartsModule,
    TitleCasePipe
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
        type: 'area',
        height: 100,
        toolbar: {
          show: false
        },
      },
      colors: [
        "#03a8f2",
      ],
      plotOptions: {
        bar: {
          distributed: true,
          horizontal: true
        },
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
          show: false,
          formatter: function (val) {
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
