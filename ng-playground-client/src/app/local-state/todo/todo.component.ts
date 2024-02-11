import { Component, inject } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Task, TasksService } from '../../data-access/tasks.service';
import { map } from 'rxjs';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';

interface TodosState {
  tasks: Task[];
  isExpanded: boolean;
}

@Component({
  selector: 'app-todo-state',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    NgIf,
    NgForOf,
    ButtonModule
  ],
  templateUrl: './todo.component.html',
  providers: [RxState]
})
export class TodoComponent {
  private state: RxState<TodosState> = inject(RxState);

  readonly tasks$ = this.state.select('tasks');

  readonly counter$ = this.state.select(
    map((state) => state.tasks),
    map((tasks) => tasks.length)
  );

  readonly isExpanded$ = this.state.select('isExpanded');

  constructor(private tasksService: TasksService) {
    this.state.connect('tasks', this.tasksService.fetchTasks$()
      .pipe(map((tasks) => tasks.filter((task) => !task.completed)))
    );
  }

  toggleExpand() {
    this.state.set('isExpanded', (currentState) => !currentState.isExpanded);
  }

}
