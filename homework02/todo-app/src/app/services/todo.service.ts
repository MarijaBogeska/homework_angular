import { Injectable, signal } from '@angular/core';
import { v4 as uuid } from 'uuid';
import {
  CreateTodoDto,
  Todo,
  TodoStatus,
  UpdateTodo,
} from '../models/todo.model';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // todos = signal<Todo[]>([]);
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

  addTodo({ title, description }: CreateTodoDto) {
    // with BehaviorSubject
    const current = this._todos.value;
    const newTodo: Todo = {
      id: uuid(),
      title: title.charAt(0).toUpperCase() + title.slice(1),
      description: description ?? '',
      status: TodoStatus.Pending,
      createdAt: new Date().toLocaleDateString('en-GB'),
    };
    this._todos.next([...current, newTodo]);
    // with signal
    // this._todos.update((current) => [
    //   ...current,
    //   {
    //     id: uuid(),
    //     title,
    //     description,
    //     status: TodoStatus.Pending,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    // ]);
  }

  updateTodoStatus(id: string, { status }: UpdateTodo) {
    // with BehaviorSubject
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

    // with signal
    // this._todos.update((current) =>
    //   current.map((todo) =>
    //     todo.id === id
    //       ? {
    //           ...todo,
    //           title: title ?? todo.title,
    //           description: description ?? todo.description,
    //           status: status ?? todo.status,
    //           updatedAt: new Date(),
    //         }
    //       : todo
    //   )
    // );
  }

  deleteTodo(id: string) {
    // with BehaviorSubject
    const filtered = this._todos.value.filter((todo) => todo.id !== id);
    this._todos.next(filtered);
    // with signal
    // this._todos.update((current) => current.filter((todo) => todo.id !== id));
  }
}
