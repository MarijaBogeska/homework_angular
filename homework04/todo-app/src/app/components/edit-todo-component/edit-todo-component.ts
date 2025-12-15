import { Component, inject, Input } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { EditTodoDto, Todo } from '../../models/todo.model';

@Component({
  selector: 'app-edit-todo-component',
  imports: [],
  templateUrl: './edit-todo-component.html',
  styleUrl: './edit-todo-component.scss',
})
export class EditTodoComponent {
  private todoService = inject(TodoService);
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  @Input() todo!: Todo;

  subscriptions: Subscription[] = [];
  editTodoForm!: FormGroup;

  ngOnInit() {
    this.initializeForm();

    const id = this.activeRoute.snapshot.paramMap.get('id');

    if (id) {
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  navigateToList() {
    this.router.navigate(['/']);
  }

  loadTodoForEdit(id: string) {
    this.subscriptions.push(
      this.todoService.getTodoById(id).subscribe({
        next: (todo) => {
          if (todo) {
            this.populateForm(todo);
          }
        },
        error: (error) => {
          console.log('Cannot find todo with id.', error);
        },
      })
    );
  }

  private populateForm(todo: Todo) {
    this.editTodoForm.patchValue({
      title: todo.title,
      description: todo.description,
      status: todo.status,
    });
  }

  private initializeForm() {
    this.editTodoForm = this.fb.group({
      title: new FormControl(this.todo.title, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      description: new FormControl(this.todo.description, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100),
      ]),
      status: new FormControl(this.todo.status),
    });
  }

  onSubmit() {
    if (this.editTodoForm.invalid) {
      this.editTodoForm.markAllAsTouched();
      return;
    }

    const formData: EditTodoDto = this.editTodoForm.value;

    const updatedTodo: EditTodoDto = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
    };

    const id = this.activeRoute.snapshot.paramMap.get('id')
    if(!id) return;

    this.subscriptions.push(
      this.todoService.updateTodoStatus(id,updatedTodo)
    )
    this.editTodoForm.reset();
    this.navigateToList();
  }

  getErrorMessage(controlName: string) {
    const control = this.editTodoForm.get(controlName);

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
