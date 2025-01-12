import { Component, OnInit } from '@angular/core';
import { MediaListComponent } from 'src/app/components/media-list/media-list.component';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-tv-shows',
  standalone: true,
  imports: [MediaListComponent],
  template: `
    <app-media-list [items]="tvShows" (itemSelected)="onTvShowSelected($event)"></app-media-list>
  `
})
export class TvShowsComponent implements OnInit {
  tvShows: any[] = [];

  constructor(private mediaService: MediaService) {}

  ngOnInit(): void {
    this.mediaService.getTvShows().subscribe(tvShows => {
      this.tvShows = tvShows;
    });
  }

  onTvShowSelected(tvShow: any): void {
    this.mediaService.setSelectedItem(tvShow);
    console.log('Selected TV Show:', tvShow);
    // Add navigation or detail display logic here
  }
}
