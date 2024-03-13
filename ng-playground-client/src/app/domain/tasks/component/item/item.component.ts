import { Component, input } from '@angular/core';
import { Item } from '../../model/task-list';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  template: `
    <div>
      <span class="fw-bold">{{ item().name }}</span>
    </div>
  `,
  styles: ``
})
export class ItemComponent {
  item = input.required<Item>();
}
