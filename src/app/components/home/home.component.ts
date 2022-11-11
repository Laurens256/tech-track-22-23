import { Component, OnInit } from '@angular/core';

import { SpotifyAuthService, TokenService } from 'src/app/core/services/spotifyAuth/index';

// @ts-ignore
import * as d3 from 'd3';

import { UserDataService } from 'src/app/core/services/userData.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private spotifyAuthService: SpotifyAuthService,
    private tokenService: TokenService,
    private userDataService: UserDataService
  ) { }

  ngOnInit(): void {
    this.checkAuth();
  }

  checkAuth() {
    if (this.tokenService.getAccessToken !== '') {
      this.spotifyAuthService.authorized();

      this.userDataService.getUserInfo();
      this.userDataService.getPlaylists();
    } else {
      this.tokenService.clearToken();
      this.spotifyAuthService.authorize();
    }
  }

  // getPlaylistTracks(playlist_id: string, headers: {}) {
  // 	this.http.get<UserPlaylistData>(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {headers: headers})
  // 		.subscribe(response => {
  // 			console.log(response);

  //       let ids: any = [];
  //       response.items.forEach(element => {
  //         ids.push(element.track.id)
  //       });
  //       ids = ids.join(',');
  //       this.getAudioFeatures(ids, headers);
  // 		})
  // }

  // getAudioFeatures(ids: any, headers: {}) {
  //   this.http.get(`https://api.spotify.com/v1/audio-features?ids=${ids}`, {headers: headers})
  //   .subscribe(response => {
  //     console.log(response);
  //   })
  // }
}
