import { Injectable } from '@angular/core';
import { Store } from '../../../infastructure/store/store';
import { Item, TaskList } from '../model/task-list';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerStore {
  store = new Store<TaskList[]>([]);

  taskLists$ = this.store.select(lists => lists);
  taskList$ = (listId: number) => this.store.select(state => state.find(lists => lists.id === listId) as TaskList);

  initialize(initialLists: TaskList[]) {
    this.store.update(_ => initialLists);
  }

  createNewList(list: TaskList) {
    this.store.update(state => [...state, list]);
  }

  remove(id: number) {
    this.store.update(state => state.filter(list => list.id !== id));
  }

  addItem(listId: number, newItem: Item) {
    this.store.update(state => state.map(list => list.id !== listId ? list : {
      ...list,
      items: [...list.items, newItem]
    }));
  }

  setItems(listId: number, items: Item[]) {
    this.store.update(state => state.map(list => list.id !== listId ? list : {
      ...list,
      items: items
    }));
  }

  patchItem(listId: number, itemId: number, patch: Partial<Item>) {
    this.store.update(state => state.map(list => list.id !== listId ? list : {
      ...list,
      items: list.items.map(item => item.id !== itemId ? item : {
        ...item,
        ...patch
      })
    }));
  }
}
