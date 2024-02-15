import { Component } from '@angular/core';
import { AnalyticsTileComponent } from '../components/analytics-tile/analytics-tile.component';
import { LegendPosition } from '../components/analytics-tile/analytics-tile';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AnalyticsTileComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  protected readonly LegendPosition = LegendPosition;
}
