import { NgIf } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-popup',
  imports: [NgIf],
  templateUrl: './popup.html',
  styleUrl: './popup.css',
})
export class Popup implements OnChanges {
  @Input() message: string = '';
  visible = false;
  text = '';

  private timeoutId: any;
  private cdr = inject(ChangeDetectorRef);

  ngOnChanges(changes: SimpleChanges) {
    if ('message' in changes && this.message) {
      this.text = this.message;
      this.visible = true;

      clearTimeout(this.timeoutId);

      this.timeoutId = setTimeout(() => {
        this.visible = false;
        this.text = '';
        this.cdr.detectChanges();
      }, 2000);
    }
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutId);
  }
}
