import { Component, EventEmitter, inject, Output } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar {
  private searchService = inject(SearchService);
  input: string = '';

  onSearchChange(value: string) {
    this.searchService.setInput(value);
    this.input=''
  }
}
