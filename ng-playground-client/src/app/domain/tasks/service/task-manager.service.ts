import { Injectable } from '@angular/core';
import { TaskManagerRepository } from '../repository/task-manager-repository';
import { TaskManagerStore } from '../store/task-manager.store';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  taskLists$ = this.taskManagerStore.taskLists$
  taskList$ = (listId: number) => this.taskManagerStore.taskList$(listId);

  constructor(
    private taskManagerRepository: TaskManagerRepository,
    private taskManagerStore: TaskManagerStore) {
  }

  createNewList(name: string): void {
    this.taskManagerRepository.createList(name)
      .subscribe(createdList => this.taskManagerStore.createNewList(createdList));
  }

  removeList(id: number): void {
    this.taskManagerRepository.delete(id)
      .subscribe(() => this.taskManagerStore.remove(id));
  }

  addItem(listId: number, name: string): void {
    this.taskManagerRepository.addItem(listId, name)
      .subscribe(newItem => this.taskManagerStore.addItem(listId, newItem));
  }

  sort(listId: number): void {
    this.taskManagerRepository.sort(listId)
      .subscribe(items => this.taskManagerStore.setItems(listId, items));
  }

  switch(listId: number, itemId: number, value: boolean) {
    this.taskManagerRepository.switch(listId, itemId, value)
      .subscribe(item => this.taskManagerStore.patchItem(listId, itemId, { checked: value }));
  }

  sync(): void {
    this.taskManagerRepository.getAllList()
      .subscribe(lists => this.taskManagerStore.initialize(lists));
  }

}
