import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TokenService } from './spotifyAuth/index';

import { UserProfile } from 'src/app/core/models/userProfile';
import { UserPlaylists } from 'src/app/core/models/userPlaylists';
import { UserPlaylistData } from 'src/app/core/models/userPlaylistData';

import { map } from 'rxjs';

@Injectable()
export class UserDataService {

  userProfileUri = 'https://api.spotify.com/v1/me';
  userPlaylistsUri = 'https://api.spotify.com/v1/me/playlists'
  userPlaylistTracksUri = 'https://api.spotify.com/v1/playlists'


  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
  }

  getUserInfo() {
    return this.http.get<UserProfile>(this.userProfileUri)
    // .subscribe(response => {
    //   console.log(response);
    // })
    // return '';
  }

  getPlaylists() {
    return this.http.get<UserPlaylists>(this.userPlaylistsUri)
    // .subscribe(response => {
    //   console.log(response.items);
    //   return response.items;
    // })
  }

  getPlaylistTracks(playlist_id: string) {
    this.http.get<UserPlaylistData>(`${this.userPlaylistTracksUri}/${playlist_id}/tracks`)
      .subscribe(response => {
        console.log(response);

        let trackIds: string | string[] = [];

        response.items.forEach(element => {

          //check of element track bestaat omdat local storage bestanden die niet hebben
          if(element.track && typeof trackIds !== 'string') {
            trackIds.push(element.track.id)
          }
        });
        trackIds = trackIds.join(',');
        this.getAudioFeatures(trackIds);
      })
  }

  getAudioFeatures(ids: string) {
    this.http.get(`https://api.spotify.com/v1/audio-features?ids=${ids}`)
      .subscribe(response => {
        console.log(response);
      })
  }
}
