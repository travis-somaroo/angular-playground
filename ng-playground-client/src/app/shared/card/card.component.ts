import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CardModule,
    NgIf
  ],
  template: `
    <div class="my-3">
      <p-card>
        <ng-content></ng-content>
      </p-card>
    </div>
  `
})
export class CardComponent {
  @Input() pictureUri?: string;
}
