import { Component, signal } from '@angular/core';
import { Navigation } from "./components/navigation/navigation";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Navigation, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('todo-app');
}
