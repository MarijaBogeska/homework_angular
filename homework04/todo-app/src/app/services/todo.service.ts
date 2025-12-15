import { Injectable, signal } from '@angular/core';
import { v4 as uuid } from 'uuid';
import {
  CreateTodoDto,
  EditTodoDto,
  Todo,
  TodoStatus,
  UpdateStatusTodo,
} from '../models/todo.model';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _todos = new BehaviorSubject<Todo[]>([
    {
      id: 'test',
      title: 'test',
      description: 'test',
      status: TodoStatus.Pending,
      createdAt: new Date().toLocaleDateString('en-GB'),
      updatedAt: new Date().toLocaleDateString('en-GB'),
    },
  ]);

  readTodos() {
    return this._todos.asObservable();
  }

  getTodoById(id: string) {
    return this._todos.pipe(
      map((todos) => todos.find((todo) => todo.id === id))
    );
  }

  addTodo({ title, description, status }: CreateTodoDto) {
    const current = this._todos.value;
    const newTodo: Todo = {
      id: uuid(),
      title: title.charAt(0).toUpperCase() + title.slice(1),
      description: description ?? '',
      status: status,
      createdAt: new Date().toLocaleDateString('en-GB'),
    };
    this._todos.next([...current, newTodo]);
  }

  updateTodoStatus(id: string, { status }: UpdateStatusTodo) {
    const updated = this._todos.value.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            status,
            updatedAt: new Date().toLocaleDateString('en-GB'),
          }
        : todo
    );
    this._todos.next(updated);
  }

  updateTodo( id: string, {description, status, title}: EditTodoDto ) {
    const updated = this._todos.value.map((todo: Todo) =>
      todo.id === id
        ? {
            ...todo,
            title: title,
            description: description,
            status: status,
            updatedAt: new Date().toLocaleDateString('en-GB'),
          }
        : todo
    );
    this._todos.next(updated);
  }

  deleteTodo(id: string) {
    const filtered = this._todos.value.filter((todo) => todo.id !== id);
    this._todos.next(filtered);
  }
}
