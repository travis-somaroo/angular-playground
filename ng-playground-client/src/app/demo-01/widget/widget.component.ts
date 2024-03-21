import { Component, inject } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { Observable } from 'rxjs';
import { Task } from '../../task.model';
import { TaskService } from './task.service';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { WidgetErrorComponent } from '../error/widget-error.component';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [
    DividerModule,
    AsyncPipe,
    ButtonModule,
    WidgetErrorComponent
  ],
  template: `
    @if (error) {
      <app-widget-error class="error" [error]="error"></app-widget-error>
    } @else {
      <div class="grid">
        <div class="col-4 col-offset-4">
          <div class="border-2 border-solid border-round border-black-100 p-3">
            <h2>Backlog Widget</h2>
            <p-divider/>
            <section>
              <ul>
                @if (tasks$ | async; as tasks) {
                  @for (task of tasks; track task) {
                    <li>{{ task.title }}</li>
                  }
                  @if (tasks.length === 0) {
                    <li>No tasks in backlog</li>
                  }
                }
              </ul>
              <p-button styleClass="w-full" [outlined]="true" (onClick)="addTaskHandler()" label="Add Task"/>
            </section>
          </div>
        </div>
      </div>
    }
  `
})
export class WidgetComponent {
  private service = inject(TaskService);

  tasks$: Observable<Task[]> = this.service.load();
  error: Error | null = null;

  addTaskHandler() {
    // * unreliable method
    this.service.addTaskSync({ id: 0, title: 'New Task' });
  }

}
