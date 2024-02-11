import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Task {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private http = inject(HttpClient);

  fetchTasks$(): Observable<Task[]> {
    return this.http.get<Task[]>('https://dummyjson.com/todos')
      .pipe(map((res: any) => res.todos));
  }
}
