import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateTodoDto, TodoStatus } from '../../models/todo.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-create',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-create.html',
  styleUrl: './todo-create.scss',
})
export class TodoCreate {
  private todoService = inject(TodoService);
  private readonly router = inject(Router);
  private fb = inject(FormBuilder);

  subscriptions: Subscription[] = [];
  createTodoForm!: FormGroup;

  ngOnInit() {
    this.initializeForm();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  navigateToList() {
    this.router.navigate(['/todoList']);
  }

  private initializeForm() {
    this.createTodoForm = this.fb.group({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100),
      ]),
      status: new FormControl('pending'),
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
      status: formData.status,
    };

    this.todoService.addTodo(createTodo);
    console.log(createTodo);
    this.createTodoForm.reset();
    this.navigateToList();
  }

  getErrorMessage(controlName: string) {
    const control = this.createTodoForm.get(controlName);

    if (control && control.errors && control.touched) {
      const { errors } = control;

      if (errors['required']) return `${controlName} is required.`;
      if (errors['minlength'])
        return `${controlName} must be at least ${errors['minlength'].requiredLength}.`;
      if (errors['maxlength'])
        return `${controlName} must be up to ${errors['maxlength'].requiredLength}.`;
    }

    return null;
  }
  todoStatus() {
    return Object.values(TodoStatus);
  }

}
