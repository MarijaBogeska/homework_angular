import {
  Component,
  computed,
  effect,
  inject,
  Input,
  signal,
} from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { TodoCard } from '../todo-card/todo-card';
import { SearchService } from '../../services/search.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  imports: [TodoCard],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
})
export class TodoList {
  private todoService = inject(TodoService);
  private searchService = inject(SearchService);
  
  todos = signal<Todo[]>([]);

  filteredTodos = computed(() => {
    const input = this.searchService.inputSignal()().toLowerCase();
    if (!input) return this.todos();
    console.log(this.filteredTodos);

    return this.todos().filter((todo) =>
      todo.title.toLowerCase().includes(input)
    );
  });

  ngOnInit() {
    this.todoService.readTodos().subscribe((data: Todo[]) => {
      this.todos.set(data);
    });
  }
}
