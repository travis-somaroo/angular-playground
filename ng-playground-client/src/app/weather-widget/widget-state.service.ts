import { Injectable } from '@angular/core';

export interface WeatherData {
  temperature: number;
  windSpeed: number;
  condition: 'sunny' | 'cloudy';
}

@Injectable({
  providedIn: 'root'
})
export class WidgetStateService {

  data: WeatherData = {
    temperature: 20,
    windSpeed: 5,
    condition: 'sunny'
  };

  lastUpdate = new Date();
}
