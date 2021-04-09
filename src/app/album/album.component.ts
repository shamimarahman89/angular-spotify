import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})


export class AlbumComponent implements OnInit {

  routeSub: any;
  album: any;
  albumSub: any;

  constructor(private matSnackBar: MatSnackBar, private route: ActivatedRoute, private musicData: MusicDataService) { }

 
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params=>{
      this.albumSub = this.musicData.getAlbumById(params.id).subscribe(albumData=>this.album = albumData);
    })
  }

  ngOnDestroy(): void{
    this.albumSub.unsubscribe();
    this.routeSub.unsubscribe();
  }

  addToFavourites(trackID): void {
    var result = this.musicData.addToFavourites(trackID).subscribe(
      success=>{
        this.matSnackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
      },
      err=>{
        this.matSnackBar.open("Unable to add song to Favourites", "Done", { duration: 1500 });
      }
    );
  }

}
