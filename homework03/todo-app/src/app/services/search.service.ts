import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private search = signal<string>('');
  private input$ = new Subject<string>();
  private readonly router = inject(Router);

  constructor() {
    this.input$.pipe(debounceTime(600)).subscribe((value) => {
      this.router.navigate(['/todoList']);
      this.search.set(value);
    });
  }
  setInput(value: string) {
    this.input$.next(value);
  }

  inputSignal() {
    return this.search;
  }
}
