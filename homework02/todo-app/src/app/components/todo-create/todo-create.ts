import { Component, inject, signal } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateTodoDto } from '../../models/todo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-create',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-create.html',
  styleUrl: './todo-create.scss',
})
export class TodoCreate {
  // constructor(private todoService: TodoService) {}
  // this can be done with constructor or inject
  private todoService = inject(TodoService);
  private fb = inject(FormBuilder);
  private readonly router = inject(Router)

  createTodoForm!: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.createTodoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.minLength(5)]],
    });
  }

  onSubmit() {
    if (this.createTodoForm.invalid) {
      this.createTodoForm.markAllAsTouched();
      return;
    }

    const formData: CreateTodoDto = this.createTodoForm.value;

    const createTodo: CreateTodoDto = {
      title: formData.title,
      description: formData.description,
    };

    this.todoService.addTodo(createTodo);
    console.log(createTodo);
    this.createTodoForm.reset();
    this.router.navigate(['/todoList'])
  }
}
