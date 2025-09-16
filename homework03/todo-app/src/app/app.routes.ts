import { Routes } from '@angular/router';
import { TodoList } from './components/todo-list/todo-list';
import { TodoCreate } from './components/todo-create/todo-create';

export const routes: Routes = [
  { path: 'todoList', component: TodoList },
  { path: 'createTodo', component: TodoCreate },
  { path: '', redirectTo: '/todoList', pathMatch: 'full' },
];
