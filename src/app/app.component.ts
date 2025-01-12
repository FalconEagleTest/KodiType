import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaListComponent } from './components/media-list/media-list.component';
import { MediaDetailComponent } from './components/media-detail/media-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MediaListComponent, MediaDetailComponent],
  template: `
    <div class="app-container">
      <div class="main-content">
        <app-media-detail></app-media-detail>
      </div>
      <div class="sidebar">
        <app-media-list></app-media-list>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      height: 100vh;
      background-color: #1a1a1a;
      color: white;
    }

    .main-content {
      flex: 1;
      height: 100%;
      overflow: hidden;
    }

    .sidebar {
      width: 400px;
      height: 100%;
      border-left: 1px solid rgba(255, 255, 255, 0.1);
      background-color: #1a1a1a;
    }
  `]
})
export class AppComponent {}