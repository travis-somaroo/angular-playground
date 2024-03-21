import { Component, inject } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { Observable } from 'rxjs';
import { Task } from '../task.model';
import { TaskService } from './task.service';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [
    DividerModule,
    AsyncPipe,
    ButtonModule
  ],
  template: `
    <div class="grid">
      <div class="col-4 col-offset-4">
        <div class="border-solid border-round border-gray-300 p-3">
          <h2>Backlog Widget</h2>
          <p-divider/>
          <section>
            <ul class="p-listbox-item-group">
              @for (task of tasks$ | async; track task) {
                <li class="p-listbox-item">
                  {{ task.title }}
                </li>
              } @empty {
                <li>No tasks in backlog</li>
              }
            </ul>
            <button pButton (click)="addTaskHandler()">Add Task</button>
          </section>
        </div>
      </div>
    </div>
  `
})
export class WidgetComponent {
  private service = inject(TaskService);

  tasks$: Observable<Task[]> = this.service.load();

  addTaskHandler() {
    // * unreliable method
    this.service.addTaskSync({ id: 0, title: 'New Task' });
  }

}