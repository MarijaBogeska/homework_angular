import { Component, Input, input } from '@angular/core';
import { Todo, TodoStatus } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-todo-card',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './todo-card.html',
  styleUrl: './todo-card.scss',
})
export class TodoCard {
  @Input() todo!: Todo;

  status = TodoStatus;
  constructor(private todoService: TodoService) {}

  todoStatus() {
    return Object.values(TodoStatus);
  }

  onStatusChange(newStatus: TodoStatus) {
    this.todoService.updateTodoStatus(this.todo.id, { status: newStatus });
  }

  deleteTodo() {
    this.todoService.deleteTodo(this.todo.id);
  }

  getBorderColor() {
    if (this.todo.status === TodoStatus.Completed) return 'lightgreen';
    if (this.todo.status === TodoStatus.InProgress) return 'orange';
    return 'lightblue';
  }
}
