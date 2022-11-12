import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { SpotifyAuthService } from './core/services/spotifyAuth/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private spotifyAuthService: SpotifyAuthService,
    private router: Router
  ) { }
  title = 'frontend';



  ngOnInit(): void {
    this.checkAuthState();
  }

  checkAuthState() {
    // niet echt nodig maar soort vangnet
    this.spotifyAuthService.authorizedCheck.subscribe((authorized: boolean) => {
      if (authorized) {
        this.router.navigate(['home']);
      }
    });
  }
}
