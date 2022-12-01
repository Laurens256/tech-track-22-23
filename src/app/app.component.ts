import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { SpotifyAuthService } from './core/services/spotifyAuth/index';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenService } from './core/services/spotifyAuth/index';
import { PreferencesService } from './core/services/preferences.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subscription: Subscription;
  constructor(
    private spotifyAuthService: SpotifyAuthService,
    private router: Router,
    private tokenService: TokenService,
    private prefSvc: PreferencesService,
  ) {
    // wanneer user reload, sla access token weer op zodat user niet opnieuw in hoeft te loggen
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (!router.navigated) {
          this.checkAuthState();
          this.tokenService.getAccessToken;
        }
      }
    });
    // Bron browser refresh: https://stackoverflow.com/questions/56325272/detect-browser-refresh-in-an-angular-project
  }
  title = 'frontend';



  ngOnInit(): void {
    this.checkAuthState();
  }

  checkAuthState() {
    // stuurt user door naar home na authorization
    this.spotifyAuthService.authorizedCheck.subscribe((authorized: boolean) => {
      if (authorized) {
        this.router.navigate(['home']);
      }
    });
  }
}
