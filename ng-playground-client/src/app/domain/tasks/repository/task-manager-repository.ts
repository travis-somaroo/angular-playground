import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Item, TaskList } from '../model/task-list';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerClient {

  constructor(private httpClient: HttpClient) {
  }

  getAllList(): Observable<TaskList[]> {
    return this.httpClient.get<TaskList[]>('api/lists');
  }

  createList(name: string): Observable<TaskList> {
    return this.httpClient.post<TaskList>('api/lists', { name: name });
  }

  delete(id: number): Observable<TaskList> {
    return this.httpClient.delete<TaskList>('api/lists/' + id);
  }

  addItem(listId: number, name: string): Observable<Item> {
    return this.httpClient.post<Item>(`api/lists/${ listId }/items`, { name: name });
  }

  sort(listId: number): Observable<Item[]> {
    return this.httpClient.get<Item[]>(`api/lists/${ listId }/sort`).pipe(
      map(items => items.map(item => ({ ...item, creationDate: new Date(item.creationDate) })))
    );
  }

  switch(listId: number, itemId: number, value: boolean): Observable<Item> {
    return this.httpClient.patch<Item>(`api/lists/${ listId }/items/${ itemId }`, { checked: value });
  }
}
