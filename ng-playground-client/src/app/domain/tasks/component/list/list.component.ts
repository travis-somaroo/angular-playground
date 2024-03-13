import { Component, inject, signal } from '@angular/core';
import { TaskManagerService } from '../../service/task-manager.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    AsyncPipe,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    ItemComponent
  ],
  template: `
    @if (list$ | async; as list) {
      <h2>{{ list.name }}</h2>
      <div class="col-12">
        <button pButton label="Sort" (click)="sortHandler(list.id)"></button>
      </div>
      <div class="col-12">
        <ul class="p-listbox-list">
          @for (item of list.items; track item) {
            <li class="p-listbox-item">
              <div>{{ item.checked }}</div>
              <p-checkbox
                [ngModel]="item.checked"
                (ngModelChange)="switchHandler(list.id, item.id, !item.checked)"
              />
              <app-item/>
            </li>
          }
        </ul>
      </div>
    }
  `,
  styles: ``
})
export class ListComponent {
  private service = inject(TaskManagerService);
  private route = inject(ActivatedRoute);

  list$ = this.route.paramMap.pipe(
    switchMap(paramMap => this.service.taskList$(+paramMap.get('id')))
  );

  newItemName = signal<string>('');

  createNewItem(listId: number): void {
    this.service.addItem(listId, this.newItemName());
    this.newItemName.set('');
  }

  sortHandler(listId: number): void {
    this.service.sort(listId);
  }

  switchHandler(listId: number, itemId: number, value: boolean) {
    this.service.switch(listId, itemId, value);
  }

}
