import { Component, OnInit } from '@angular/core';
import * as data from '../data/NewReleasesAlbums.json';

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
// class Release{
//   album_type: string;
//   artists: Array<Artist>;
//   available_markets: Array<string>;
//   external_urls: {};
//   href: string;
//   id: string;
//   images: Array<Image>;
//   name: string;
//   release_date: string;
//   release_date_precision: string;
//   total_tracks: number;
//   type: string;
//   uri: string;

// }

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {
  
  releases: any;

  constructor() { }


  ngOnInit(): void {
    this.releases = data.albums.items;
  }

}
