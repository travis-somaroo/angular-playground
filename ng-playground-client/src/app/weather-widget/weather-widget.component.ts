import { Component, inject, Input, TemplateRef } from '@angular/core';
import { CardModule } from 'primeng/card';
import { WidgetStateService } from './widget-state.service';
import { WidgetActionsService } from './widget-actions.service';
import { ButtonModule } from 'primeng/button';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    NgTemplateOutlet
  ],
  templateUrl: './weather-widget.component.html',
})
export class WeatherWidgetComponent {
  @Input()
  headerTemplate: TemplateRef<any>;

  @Input()
  contentTemplate: TemplateRef<WidgetStateService>;

  state = inject(WidgetStateService);
  actions = inject(WidgetActionsService);
}
