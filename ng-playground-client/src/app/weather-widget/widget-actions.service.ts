import { inject, Injectable } from '@angular/core';
import { WidgetStateService } from './widget-state.service';

@Injectable({
  providedIn: 'root'
})
export class WidgetActionsService {
  state = inject(WidgetStateService, {self: true});

  reload() {
    this.state.lastUpdate = new Date();
    console.log('Reloads widget data...');
  }

  copyData() {
    console.log('Copy widget data into clipboard...');
  }
}
