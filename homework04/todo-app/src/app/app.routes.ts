import { Routes } from '@angular/router';
import { TodoList } from './components/todo-list/todo-list';
import { TodoCreate } from './components/todo-create/todo-create';
import { EditTodoComponent } from './components/edit-todo-component/edit-todo-component';

export const routes: Routes = [
  { path: 'todoList', component: TodoList },
  { path: 'createTodo', component: TodoCreate },
  { path: 'editTodo', component: EditTodoComponent},
  { path: '', redirectTo: '/todoList', pathMatch: 'full' },
];
