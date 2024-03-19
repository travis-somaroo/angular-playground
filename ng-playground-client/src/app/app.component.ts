import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HideAfterDirective } from './directive/hide-after.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HideAfterDirective],
  template: `
    <div>
      <h1>Structural Directives</h1>
      <section *hideAfter="5000 as time; then placeholder; let counter = counter; let myDefault" class="primary-banner">
        <h2>Temp content</h2>
        <p>This layout will disappear in {{ time }}/{{ myDefault }} seconds. It disappears in {{ counter }}</p>
      </section>
    </div>

    <!--Value should be the property defined in the context-->
    <ng-template #placeholder let-hiddenAfter="hideAfter" let-defaultValue>
      <p class="text-black-500">This is a placeholder. It took {{ hiddenAfter }} seconds to render
        this. {{ defaultValue }}</p>
    </ng-template>

    <!--Generated code-->
    <!--    <ng-template hideAfter>-->
    <!--      <section class="primary-banner">-->
    <!--        <h2>Temp content</h2>-->
    <!--        <p>This layout will disappear in 5 seconds</p>-->
    <!--      </section>-->
    <!--    </ng-template>-->
  `,
  styles: `
    .primary-banner {
      width: 90vw;
      color: white;
      padding: .75rem;
      border-radius: 10px;
      background-color: rebeccapurple;
    }
  `
})
export class AppComponent {
}
