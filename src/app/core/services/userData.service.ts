import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TokenService } from './spotifyAuth/index';

import { UserProfile } from 'src/app/core/models/userProfile';
import { UserPlaylists } from 'src/app/core/models/userPlaylists';
import { UserPlaylistData } from 'src/app/core/models/userPlaylistData';

@Injectable()
export class UserDataService {

  private apiUrl = 'https://api.spotify.com/v1/';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
    ) {
  }

  getUserInfo() {

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.tokenService.getAccessToken}`)
      .set('Accept', 'application/json');

    this.http.get<UserProfile>("https://api.spotify.com/v1/me")
      .subscribe(response => {
        console.log(response);
      })
  }

  getUserPlaylists() {

  }


}
