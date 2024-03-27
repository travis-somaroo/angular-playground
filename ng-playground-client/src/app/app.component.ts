import { Component, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Confirmable } from './confirm/decorators/confirmable';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButton],
  template: `
    <div class="flex align-items-center justify-content-center my-3">
      <button mat-raised-button (click)="doSomething()">Do Something</button>
    </div>
  `
})
export class AppComponent {
  static injector: Injector;

  constructor(injector: Injector) {
    AppComponent.injector = injector;
  }


  @Confirmable()
  doSomething(): void {
    console.log('Something happened...');
  }
}
