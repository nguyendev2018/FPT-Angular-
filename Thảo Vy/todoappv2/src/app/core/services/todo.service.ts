import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToDo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  id: number = 0;
  toDoList = new BehaviorSubject<ToDo[]>([]);
  constructor() {}
  handleAdd(name: string): void {
    const newItem: ToDo = {
      id: ++this.id,
      name,
      status: false,
      priority: 1,
    };
    this.toDoList.next(this.toDoList.getValue().concat([newItem]));
  }
  handleChange(id: number): void {
    const index = this.toDoList.getValue().findIndex((item) => item.id === id);
    this.toDoList.getValue()[index].status =
      !this.toDoList.getValue()[index].status;
  }
  handleRemove(id: number): void {
    this.toDoList.next(
      this.toDoList.getValue().filter((item) => item.id !== id)
    );
  }
  handleUp(id: number): void {
    const index = this.toDoList.getValue().findIndex((item) => item.id === id);
    this.toDoList.getValue()[index].priority = ++this.toDoList.getValue()[index]
      .priority;
  }
  handleDown(id: number): void {
    const index = this.toDoList.getValue().findIndex((item) => item.id === id);
    this.toDoList.getValue()[index].priority = --this.toDoList.getValue()[index]
      .priority;
  }
}
