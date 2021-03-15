import { Component, OnInit } from '@angular/core';
import * as data from '../data/SearchResultsAlbum.json';

// class Artist{
//   external_urls: {};
//   href: string;
//   id: string;
//   name: string;
//   type: string;
//   uri: string;
// }
// class Image{
//   height: number;
//   url: string;
//   width: number;
// }
// class Copyright{
//   text: string;
//   type: string;
// }

// class Tracks{
//   href: string;
//   items: [];
//   limit: number;
//   next: any;
//   offset: number;
//   previous: any;
//   total: number;
// }
// class Album{
//   album_type: string;
//   artists: Array<Artist>;
//   copyrights: Array<Copyright>;
//   external_ids: {};
//   external_urls: {};
//   genres: [];
//   href: string;
//   id: string;
//   images: Array<Image>;
//   label: string;
//   name: string;
//   popularity: number;
//   release_date: Date;
//   release_date_precision: string;
//   total_tracks: number;
//   tracks: Tracks;
//   type: string;
//   uri: string;
  
// }
@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  constructor() { }

  album: any;
  ngOnInit(): void {
    this.album = (data as any).default;
  }

}
