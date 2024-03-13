import { Component } from '@angular/core';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  template: `
    <div>
      <span class="fw-bold">{{ item.name }}</span>
    </div>
  `,
  styles: ``
})
export class ItemComponent {
  // item = input;
}
