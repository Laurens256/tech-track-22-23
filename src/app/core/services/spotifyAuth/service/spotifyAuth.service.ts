import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { SpotifyAuth } from '../../../models/spotifyAuth';

@Injectable()
export class SpotifyAuthService {

  private SpotifyAuth: SpotifyAuth = {
    client_id: environment.client_id,
    response_type: 'code',
    redirect_uri: environment.redirect_uri_decoded,
    scope: 'user-read-private user-top-read playlist-modify-public playlist-modify-private'
  };


  public authorize() {
    window.location.href = this.buildAuthUrl();
  }

  private buildAuthUrl(): string {
    const params = [];
    for (const [key, value] of Object.entries(this.SpotifyAuth)) {
      if (typeof (value) === 'object') {
        params.push(`${key}=${(value as string[]).join(' ')}`);
      } else {
        params.push(`${key}=${value}`);
      }
    }
    return `https://accounts.spotify.com/authorize?${params.join('&')}`;
  }

}
