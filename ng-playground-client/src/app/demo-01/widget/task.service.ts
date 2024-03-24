import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../task.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  load() {
    return this.http.get<Task[]>(`https://jsonplaceholder.typicode.com/todosa?_start=0&_limit=3`).pipe(
      // retry()
      catchError(err => {
        console.log('Error handled by Task Service...');
        return throwError(() => {
          console.log('Error rethrown by Task Service...');
          return new Error("Couldn't load data...");
        });
      })
    );
  }

  addTaskSync(task: Task): Task | never {
    if (task.id === 0) {
      throw Error(`Value zero (0) is not allowed as a task ID`);
    }
    return task;
  }
}
