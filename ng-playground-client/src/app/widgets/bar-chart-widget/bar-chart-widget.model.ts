import {
  ApexAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis
} from 'ng-apexcharts';

export type BarChartConfig = {
  chart: ApexChart;
  series: ApexAxisChartSeries;
  labels: string[];
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
  dataLabels: { enabled: boolean },
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  colors: string[];
}

export enum ColorScheme {
  BLUE_MONO = 'blue-mono',
  ORANGE_MONO = 'orange-mono'
}
