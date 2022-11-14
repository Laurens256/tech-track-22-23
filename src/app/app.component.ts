import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { SpotifyAuthService } from './core/services/spotifyAuth/index';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

export let browserRefresh = false;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subscription: Subscription;
  constructor(
    private spotifyAuthService: SpotifyAuthService,
    private router: Router
  ) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
    });
    // Bron browser refresh: https://stackoverflow.com/questions/56325272/detect-browser-refresh-in-an-angular-project
  }
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
