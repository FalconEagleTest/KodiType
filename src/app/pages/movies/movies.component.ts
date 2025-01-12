import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="movie-list">
      <div *ngFor="let movie of movies" class="movie-item" (click)="selectMovie(movie)">
        <img [src]="'https://image.tmdb.org/t/p/w200' + movie.poster_path" alt="{{ movie.title }}">
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.overview }}</p>
      </div>
    </div>
  `,
  styles: [`
    .movie-list {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
    .movie-item {
      width: 200px;
      cursor: pointer;
      text-align: center;
    }
    .movie-item img {
      width: 100%;
      border-radius: 10px;
    }
  `]
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];

  constructor(private mediaService: MediaService) {
    console.log('MoviesComponent instantiated');
  }

  ngOnInit(): void {
    console.log("In movies - ngOnInit called");
    this.mediaService.getMovies().subscribe({
      next: movies => {
        console.log('Movies fetched:', movies);
        this.movies = movies; // Ensure you're accessing the correct structure of the API response
      },
      error: err => console.error('Error fetching movies:', err)
    });


  }

  selectMovie(movie: any): void {
    this.mediaService.setSelectedItem(movie);
    // Example: Navigate or display details based on the selected movie
    console.log('Selected Movie:', movie);
  }
}
