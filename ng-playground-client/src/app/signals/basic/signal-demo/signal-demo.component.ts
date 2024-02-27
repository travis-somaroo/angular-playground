import { Component, computed, effect, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

/**
 * Signals = value + change notification
 * <br>
 * Think of signal reactivity as a box, when the value of the signal changes, the items in the box glows, notifying change.
 * When we call a signal price() we are called the signal getter to open the "box". Signals mark a component as OnPush for check.
 * <br>
 * If a signal in the template it read, it's scheduled to re-render.
 * <br>
 * During template rendering:
 * - Reading a signal returns the signal value.
 * - Also registers the signal as a dependency of the view.
 */

@Component({
  selector: 'app-signal-demo',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  template: `
    <div class="grid">
      <div class="col-3 col-offset-3">
        <h2>Signal Demo</h2>
        <p>
          {{ price() | currency }}
        </p>
      </div>
    </div>
  `,
})
export class SignalDemoComponent {
  // Creating a signal this way makes the signal writable
  quantity = signal(2);
  price = computed(() => this.quantity() * 15.99);

  x = signal(5);
  y = signal(9);
  // Signals are read by calling its getter function

  // computed() signals recompute when its dependant signals change, it creates a new signal and is read only.
  // Computed values are memoized
  z = computed(() => this.x() + this.y());

  constructor() {
    effect(() => {
      // We cannot write to signals in computed/effects
      console.log(this.z());
    });
    // Setting/Updating replaces the signal in the box, consumers only see/use the most recent value
    this.x.set(99);
    this.y.update(v => v * 2.5);
  }
}
