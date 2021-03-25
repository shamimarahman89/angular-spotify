import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  results: any;
  searchQuery: any;
  routeSub: any;
  querySub: any;
  

  constructor(private route: ActivatedRoute,private musicData: MusicDataService) { }

  ngOnInit(): void {
    this.routeSub = this.route.queryParams.subscribe(params=>{
      this.searchQuery = params["q"];
      this.querySub = this.musicData.searchArtists(this.searchQuery).subscribe(queryData => {
        this.results = queryData.artists.items.filter(artist => artist.images.length > 0);
      });
      
    });
    
  }

  ngOnDestroy(): void{
    this.routeSub.unsubscribe();
    this.querySub.unsubscribe();
  }

}
