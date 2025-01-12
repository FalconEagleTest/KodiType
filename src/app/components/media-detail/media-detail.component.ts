import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaService } from '../../services/media.service';
import { MediaItem } from '../../models/media-item.interface';

@Component({
  selector: 'app-media-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="media-detail" *ngIf="selectedItem">
      <div class="media-image">
        <img [src]="selectedItem.largeImageUrl" [alt]="selectedItem.title">
      </div>
      <div class="media-info">
        <h2>{{ selectedItem.title }}</h2>
        <div class="meta-info" *ngIf="selectedItem.type !== 'menu'">
          <span>{{ selectedItem.type === 'movie' ? 'Movie' : 'TV Show' }}</span>
          <span>{{ selectedItem.category }}</span>
          <span *ngIf="selectedItem.releaseDate">{{ selectedItem.releaseDate | date:'yyyy.MM.dd' }}</span>
        </div>
        <p class="description">{{ selectedItem.description }}</p>
      </div>
    </div>
    <div class="empty-state" *ngIf="!selectedItem">
      <p>Select an item to view details</p>
    </div>
  `,
  styles: [`
    .media-detail {
      height: 100%;
      background-color: #1a1a1a;
      color: white;
      position: relative;
    }

    .media-image {
      height: 70%;
      width: 100%;
      overflow: hidden;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 150px;
        background: linear-gradient(to bottom, transparent, #1a1a1a);
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .media-info {
      padding: 24px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to bottom, transparent, #1a1a1a 20%);

      h2 {
        margin: 0 0 16px;
        font-size: 2em;
        font-weight: bold;
      }

      .meta-info {
        display: flex;
        gap: 12px;
        margin-bottom: 16px;

        span {
          padding: 4px 8px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          font-size: 0.9em;
        }
      }

      .description {
        margin: 0;
        font-size: 1.1em;
        line-height: 1.5;
        opacity: 0.9;
        max-width: 800px;
      }
    }

    .empty-state {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.5);
      font-size: 1.2em;
    }
  `]
})
export class MediaDetailComponent implements OnInit {
  selectedItem: MediaItem | null = null;

  constructor(private mediaService: MediaService) {}

  ngOnInit(): void {
    this.mediaService.getSelectedItem().subscribe(item => {
      this.selectedItem = item;
    });
  }
}