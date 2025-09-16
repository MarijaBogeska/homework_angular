export enum TodoStatus {
  Pending = 'pending',
  InProgress = 'in-progress',
  Completed = 'completed',
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
  status: TodoStatus;
}

export interface CreateTodoDto {
  title: string;
  description: string;
  status: TodoStatus;
}

export interface UpdateTodo {
  title?: string;
  description?: string;
  status: TodoStatus;
}
