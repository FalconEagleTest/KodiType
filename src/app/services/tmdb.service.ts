import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MediaItem } from '../models/media-item.interface';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiKey = 'YOUR_TMDB_API_KEY'; // Replace with your API key
  private baseUrl = 'https://api.themoviedb.org/3';
  private imageBaseUrl = 'https://image.tmdb.org/t/p';

  constructor(private http: HttpClient) {}

  getMovies(page: number = 1): Observable<MediaItem[]> {
    return this.http.get<any>(
      `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&page=${page}`
    ).pipe(
      map(response => response.results.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        description: movie.overview,
        thumbnailUrl: `${this.imageBaseUrl}/w200${movie.poster_path}`,
        largeImageUrl: `${this.imageBaseUrl}/original${movie.poster_path}`,
        releaseDate: movie.release_date,
        category: 'Movie',
        type: 'Movie',
        rating: movie.vote_average
      })))
    );
  }

  getTvShows(page: number = 1): Observable<MediaItem[]> {
    return this.http.get<any>(
      `${this.baseUrl}/tv/popular?api_key=${this.apiKey}&page=${page}`
    ).pipe(
      map(response => response.results.map((show: any) => ({
        id: show.id,
        title: show.name,
        description: show.overview,
        thumbnailUrl: `${this.imageBaseUrl}/w200${show.poster_path}`,
        largeImageUrl: `${this.imageBaseUrl}/original${show.poster_path}`,
        releaseDate: show.first_air_date,
        category: 'TV Show',
        type: 'TV',
        rating: show.vote_average
      })))
    );
  }

  search(query: string, page: number = 1): Observable<MediaItem[]> {
    return this.http.get<any>(
      `${this.baseUrl}/search/multi?api_key=${this.apiKey}&query=${query}&page=${page}`
    ).pipe(
      map(response => response.results
        .filter((item: any) => item.media_type === 'movie' || item.media_type === 'tv')
        .map((item: any) => ({
          id: item.id,
          title: item.media_type === 'movie' ? item.title : item.name,
          description: item.overview,
          thumbnailUrl: `${this.imageBaseUrl}/w200${item.poster_path}`,
          largeImageUrl: `${this.imageBaseUrl}/original${item.poster_path}`,
          releaseDate: item.media_type === 'movie' ? item.release_date : item.first_air_date,
          category: item.media_type === 'movie' ? 'Movie' : 'TV Show',
          type: item.media_type === 'movie' ? 'Movie' : 'TV',
          rating: item.vote_average
        })))
    );
  }
}