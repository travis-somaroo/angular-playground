import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder } from './core/cdk-forms/ui/form-builder/form-builder';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormBuilder],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
