import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TokenService } from './spotifyAuth/index';

import { UserProfile } from 'src/app/core/models/userProfile';
import { UserPlaylists } from 'src/app/core/models/userPlaylists';
import { UserPlaylistData } from 'src/app/core/models/userPlaylistData';

@Injectable()
export class UserDataService {

  userProfileUri = 'https://api.spotify.com/v1/me';
  userPlaylistsUri = 'https://api.spotify.com/v1/me/playlists'
  userPlaylistTracksUri = 'https://api.spotify.com/v1/playlists/'


  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
  }

  getUserInfo() {
    this.http.get<UserProfile>(this.userProfileUri)
      .subscribe(response => {
        console.log(response);
      })
  }

  getPlaylists() {
    this.http.get<UserPlaylists>(this.userPlaylistsUri)
      .subscribe(response => {
        console.log(response);
      })
  }

  getPlaylistTracks(playlist_id: string) {
    this.http.get<UserPlaylistData>(`${this.userPlaylistTracksUri}/${playlist_id}/tracks`)
      .subscribe(response => {
        console.log(response);

        let trackIds: [] | string | any = [];
        response.items.forEach(element => {
          trackIds.push(element.track.id)
        });
        trackIds = trackIds.join(',');
        // this.getAudioFeatures(trackIds);
      })
  }
}
