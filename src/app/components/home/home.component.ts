import { Component, OnInit } from '@angular/core';

import { SpotifyAuthService, TokenService } from 'src/app/core/services/spotifyAuth/index';

import { UserProfile } from 'src/app/core/models/userProfile';
import { UserPlaylists } from 'src/app/core/models/userPlaylists';

import { forkJoin } from 'rxjs';

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

  userProfile!: UserProfile
  userPlaylists!: UserPlaylists['items'];

  checkAuth() {
    if (this.tokenService.getAccessToken !== '') {
      this.spotifyAuthService.authorized();

      this.requestUserData();

      // this.userDataService.getUserInfo();
      // this.userPlaylists = this.userDataService.getPlaylists();
      // console.log(this.userPlaylists);

    } else {
      this.tokenService.clearToken();
      this.spotifyAuthService.authorize();
    }
  }

  requestUserData() {
    forkJoin({
      userProfile: this.userDataService.getUserInfo(),
      userPlaylists: this.userDataService.getPlaylists()
    }).subscribe(data => {
      console.log(data);

      this.userProfile = data.userProfile
      this.userPlaylists = data.userPlaylists.items;
    })
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
