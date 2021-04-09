/********************************************************************************* 
 * * WEB422 – Assignment 06 
 * * I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
 * * No part of this assignment has been copied manually or electronically from any other source 
 * * (including web sites) or distributed to other students. 
 * * * Name: _Shamima Rahman_ Student ID: _154321194___ Date: _8th April 2021_
 * 
 * Online Link: _______________________________________________________________
 * 
 * * * ********************************************************************************/



import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NavigationStart, Router, Event} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'web422-a6';
  searchString: string;
  public token: any;

  constructor( private route: ActivatedRoute, private router: Router, private authService: AuthService ){}
  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
        this.token = this.authService.readToken();
      }
    });
  
  }

  handleSearch(){
    this.router.navigate(['/search'], { queryParams: { q: this.searchString} });
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }


}
