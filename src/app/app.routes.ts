import { Routes } from '@angular/router';
import { MoviesComponent } from './pages/movies/movies.component';
import { TvShowsComponent } from './pages/tv-shows/tv-shows.component';
import { SearchComponent } from './pages/search/search.component';

export const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', component: MoviesComponent },
  { path: 'tv', component: TvShowsComponent },
  { path: 'search', component: SearchComponent },
];
