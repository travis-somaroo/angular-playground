import { Component, effect, signal, untracked } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-signal-effects',
  standalone: true,
  imports: [
    ButtonModule
  ],
  template: `
    <button pButton label="Increment" (click)="set()"></button>

    <div class="mt-5 flex flex-column gap-3">
      <label>
        Count 1:
        <span class="font-bold">{{ count1() }}</span>
      </label>
      <label>
        Count 2:
        <span class="font-bold">{{ count2() }}</span>
      </label>
    </div>
  `,
  styles: ``
})
export class SignalEffectsComponent {
  count1 = signal<number>(0);
  count2 = signal<number>(0);

  // The effect will only be triggered when updating the count1 signal to a new value. Comment out line 29 for demo.
  countEff = effect(() => {
    console.log(
      `Count: ${this.count1()}, Other Count: ${untracked(this.count2)}`
    );
  });

  set() {
    // Triggers the effect.
    this.count1.update(v => v + 1);

    // Does not trigger the effect, performance is optimized.
    this.count2.update(v => v + 1);
  }


}
