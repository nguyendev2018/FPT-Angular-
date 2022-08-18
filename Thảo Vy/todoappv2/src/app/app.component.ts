import { ToDo } from './core/models/todo';
import { Component, OnInit } from '@angular/core';
import { TodoService } from './core/services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'todoappv2';
  toDoList: ToDo[] = [];
  str: string | undefined = undefined;
  constructor(private toDoService: TodoService) {}
  ngOnInit(): void {
    this.toDoService.toDoList.subscribe({
      next: (result) => {
        this.toDoList = result;
      },
    });
  }
  handleAdd(name: string): void {
    this.toDoService.handleAdd(name);
  }
  handleChange(id: number): void {
    this.toDoService.handleChange(id);
    this.str = 'Angular';
  }
  handleRemove(id: number): void {
    this.toDoService.handleRemove(id);
  }
  handleUp(id: number): void {
    this.toDoService.handleUp(id);
  }
  handleDown(id: number): void {
    this.toDoService.handleDown(id);
  }
}
