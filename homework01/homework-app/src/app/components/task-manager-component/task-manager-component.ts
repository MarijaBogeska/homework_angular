import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Popup } from '../popup/popup';

@Component({
  selector: 'app-task-manager-component',
  imports: [FormsModule, CommonModule, Popup],
  templateUrl: './task-manager-component.html',
  styleUrl: './task-manager-component.css',
})
export class TaskManagerComponent {
  tasks: { title: string; completed: boolean }[] = [
    { title: 'test', completed: false },
  ];
  // log
  message: string = '';
  log: string[] = [];

  // Add new task
  newTask: string = '';
  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasks.push({ title: this.newTask, completed: false });
      this.log.push(`New task added: ${this.newTask}`);
      this.newTask = '';
      this.message = this.log.at(-1) || '';
    }
  }

  // Toggle the section
  isClicked: boolean = false;
  toggleAddTask() {
    this.isClicked = !this.isClicked;
  }

  // Mark as completed
  toggleCompleted(index: number) {
    const task = this.tasks[index];
    if (task) {
      task.completed = !task.completed;
      this.log.push(
        `Task "${task.title}" ${
          task.completed ? 'completed' : 'marked incomplete'
        }`
      );
      this.message = this.log.at(-1) || '';
    }
  }

  // Delete all tasks
  clearAll() {
    if (this.tasks.length > 0) {
      this.tasks = [];
      this.log.push(`All tasks deleted`);
      this.message = this.log.at(-1) || '';
    }
  }

  // Number of tasks
  get compeletedTaks(): number {
    return this.tasks.filter((task) => task.completed).length;
  }
  get pendingTasks(): number {
    return this.tasks.filter((task) => !task.completed).length;
  }
}
