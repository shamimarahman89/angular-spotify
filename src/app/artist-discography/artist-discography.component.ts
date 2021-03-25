import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {

  albums: any;
  artist: any;
  albumSub: any;
  artistSub: any;
  routeSub: any;

  constructor(private route: ActivatedRoute, private musicData: MusicDataService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params=>{
      this.artistSub = this.musicData.getArtistById(params.id).subscribe(artistData => this.artist = artistData);
      this.albumSub = this.musicData.getAlbumsByArtistId(params.id).subscribe(albumData => {
        this.albums = albumData.items.filter((value, index) =>  albumData.items.findIndex(item => item.name == value.name) === index);
      });
    });
  }

  ngOnDestroy(): void{
    this.artistSub.unsubscribe();
    this.albumSub.unsubscribe();
    this.routeSub.unsubscribe();
  }

}
