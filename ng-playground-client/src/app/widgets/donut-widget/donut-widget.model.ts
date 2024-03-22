import { ApexChart, ApexLegend, ApexPlotOptions } from 'ng-apexcharts';

export type DonutChartConfig = {
  chart: ApexChart;
  series: number[];
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  dataLabels: { enabled: boolean },
  plotOptions: ApexPlotOptions;
}

export enum ColorScheme {
  DEFAULT = 'default',
  DULL = 'dull',
  BLUE_MONO = 'blue-mono',
  ORANGE_MONO = 'orange-mono'
}

export enum DisplayType {
  AVERAGE = 'average',
  CHANGE = 'change',
}



