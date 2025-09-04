import { Component, signal } from '@angular/core';
import { TaskManagerComponent } from './components/task-manager-component/task-manager-component';

@Component({
  selector: 'app-root',
  imports: [TaskManagerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
