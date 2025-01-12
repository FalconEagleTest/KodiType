import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="media-list">
      <div 
        *ngFor="let item of items; let i = index" 
        class="media-item" 
        (click)="onSelectItem(item)"
        [class.selected]="i === selectedIndex"
        tabindex="0"
        (keydown)="onKeydown($event, i)">
        <img [src]="'https://image.tmdb.org/t/p/w200' + item.poster_path" alt="{{ item.title || item.name }}">
        <div class="media-info">
          <h3>{{ item.title || item.name }}</h3>
          <p>{{ item.overview }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .media-list {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
    .media-item {
      width: 200px;
      cursor: pointer;
      text-align: center;
      padding: 10px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      transition: transform 0.2s, border-color 0.2s;
    }
    .media-item:hover, .media-item.selected {
      transform: scale(1.05);
      border-color: #fff;
    }
    .media-item img {
      width: 100%;
      border-radius: 10px;
    }
    .media-info h3 {
      margin: 10px 0 5px;
    }
    .media-info p {
      font-size: 0.9em;
      color: rgba(255, 255, 255, 0.7);
    }
  `]
})
export class MediaListComponent {
  @Input() items: any[] = [];
  @Output() itemSelected = new EventEmitter<any>();

  selectedIndex: number = -1;

  onSelectItem(item: any): void {
    this.selectedIndex = this.items.indexOf(item);
    this.itemSelected.emit(item);
  }

  onKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Enter') {
      this.onSelectItem(this.items[index]);
    }
  }
}
