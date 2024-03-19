import { ApexChart, ApexLegend, ApexPlotOptions } from 'ng-apexcharts';

export type DonutChartConfig = {
  chart: ApexChart;
  series: number[];
  plotOptions: ApexPlotOptions;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
}

export enum ColorScheme {
  DEFAULT = 'default',
  DULL = 'dull',
  BLUE_MONO = 'blue-mono',
  ORANGE_MONO = 'orange-mono'
}
