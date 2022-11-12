import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { SpotifyAuth } from '../../models/spotifyAuth';

@Injectable()
export class SpotifyAuthService {

  private isAuthorized: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private SpotifyAuth: SpotifyAuth = {
    client_id: environment.client_id,
    response_type: 'code',
    redirect_uri: environment.apiUrl,
    scope: 'user-read-private user-top-read playlist-modify-public playlist-modify-private'
  };


  public authorize() {
    window.location.href = this.buildAuthUrl();
  }

  public authorized(): void {
    this.isAuthorized.next(true);
  }

  public get authorizedCheck(): Observable<boolean> {
    return this.isAuthorized.asObservable();
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
