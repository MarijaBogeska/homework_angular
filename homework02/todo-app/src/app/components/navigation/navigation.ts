import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchBar } from '../search-bar/search-bar';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, SearchBar],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation {}
