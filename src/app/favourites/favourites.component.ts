import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favourites: Array<any>;
  favouritesSub: any;

  constructor(private musicData: MusicDataService) { }

  ngOnInit(): void {
    this.favouritesSub = this.musicData.getFavourites().subscribe(favouritesData => this.favourites = favouritesData.tracks);
  }

  removeFromFavourites(id){
    this.favouritesSub = this.musicData.removeFromFavourites(id).subscribe(favouritesData => this.favourites = favouritesData.tracks);
  }

  ngOnDestroy(): void{
    this.favouritesSub.unsubscribe();
  }

}
