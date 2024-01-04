import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { WidgetStateService } from './widget-state.service';
import { WidgetActionsService } from './widget-actions.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule
  ],
  templateUrl: './weather-widget.component.html',
})
export class WeatherWidgetComponent {
  state = inject(WidgetStateService);
  actions = inject(WidgetActionsService);
}
