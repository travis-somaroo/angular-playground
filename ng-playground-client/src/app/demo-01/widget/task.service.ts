import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  load() {
    return this.http.get<Task[]>(`https://jsonplaceholder.typicode.com/todos?_start=0&_limit=3`);
  }

  addTaskSync(task: Task): Task | never {
    if (task.id === 0) {
      throw Error(`Value zero (0) is not allowed as a task ID`);
    }
    return task;
  }
}
