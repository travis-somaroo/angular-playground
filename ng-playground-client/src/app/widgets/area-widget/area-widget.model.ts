import {
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexStroke, ApexTooltip,
  ApexXAxis,
  ApexYAxis
} from 'ng-apexcharts';

export type Series = {
  name: string;
  data: number[];
}

export type AreaChartConfig = {
  chart: ApexChart;
  series: ApexAxisChartSeries;
  labels: string[];
  stroke: ApexStroke;
  legend: ApexLegend;
  fill: ApexFill;
  dataLabels: { enabled: boolean },
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  colors: string[];
}
