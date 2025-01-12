import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private apiKey = 'b370b60447737762ca38457bd77579b3'; // Replace with your TMDB API key
  private baseUrl = 'https://api.themoviedb.org/3';

  private selectedItem = new BehaviorSubject<any | null>(null);

  constructor(private http: HttpClient) {
    console.log('MediaService instantiated');
  }

  // Get a list of popular movies
  getMovies(): Observable<any[]> {
    console.log('Get Movies');
    return this.http
      .get<{ results: any[] }>(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`)
      .pipe(map(response => response.results));
  }

  // Get a list of popular TV shows
  getTvShows(): Observable<any[]> {
    return this.http
      .get<{ results: any[] }>(`${this.baseUrl}/tv/popular?api_key=${this.apiKey}&language=en-US&page=1`)
      .pipe(map(response => response.results));
  }

  // Get the selected item as an observable
  getSelectedItem(): Observable<any | null> {
    return this.selectedItem.asObservable();
  }

  // Set the selected item
  setSelectedItem(item: any): void {
    this.selectedItem.next(item);
  }
}
