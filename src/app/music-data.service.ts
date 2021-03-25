import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';

import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {
  favouritesList: Array<any> = [];

  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) { }  

  getNewReleases(): Observable<any> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<any>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `Bearer ${token}` } });
      }));
  }

  getArtistById(id): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getAlbumsByArtistId(id): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getAlbumById(id): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  searchArtists(searchString): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  addToFavourites(id): boolean {
    if(id === null || id === undefined || this.favouritesList.length >= 50){
      return false;
    }
    else{
      this.favouritesList.push(id);
      return true;
    }
  }

  removeFromFavourites(id): Observable<any> {
    var index = this.favouritesList.indexOf(id);
    if(index >= 0){
      this.favouritesList.splice(index,1);
    }
    return this.getFavourites();
  }

  getFavourites(): Observable<any> {
    if(this.favouritesList.length > 0){
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        var favouritesListItems = this.favouritesList.join();
        return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${favouritesListItems}`, { headers: { "Authorization": `Bearer ${token}` } });
      }));
    }
    else {
      return new Observable(o=>{o.next([])});
    }
    
  }

}