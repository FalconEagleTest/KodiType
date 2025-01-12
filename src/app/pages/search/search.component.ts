import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MediaListComponent } from 'src/app/components/media-list/media-list.component';
import { MediaDetailComponent } from 'src/app/components/media-detail/media-detail.component';
import { TmdbService } from 'src/app/services/tmdb.service';
import { MediaItem } from 'src/app/models/media-item.interface';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, MediaListComponent, MediaDetailComponent],
  template: `
    <div class="page-container">
      <div class="search-header">
        <input 
          type="text" 
          [(ngModel)]="searchQuery"
          (ngModelChange)="onSearch($event)"
          placeholder="Search for movies or TV shows..."
          class="search-input"
        >
      </div>
      <div class="content-container">
        <div class="main-content">
          <app-media-detail></app-media-detail>
        </div>
        <div class="sidebar">
          <app-media-list [items]="searchResults"></app-media-list>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .search-header {
      padding: 20px;
      background: rgba(0, 0, 0, 0.3);
    }
    .search-input {
      width: 100%;
      padding: 10px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      border-radius: 4px;
    }
    .content-container {
      display: flex;
      flex: 1;
    }
    .main-content {
      flex: 1;
      height: 100%;
    }
    .sidebar {
      width: 400px;
      height: 100%;
      border-left: 1px solid rgba(255, 255, 255, 0.1);
    }
  `]
})
export class SearchComponent {
  searchQuery: string = '';
  searchResults: MediaItem[] = [];
  private searchSubject = new Subject<string>();

  constructor(private tmdbService: TmdbService) {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      if (query) {
        this.tmdbService.search(query).subscribe(results => {
          this.searchResults = results;
        });
      } else {
        this.searchResults = [];
      }
    });
  }

  onSearch(query: string): void {
    this.searchSubject.next(query);
  }
}