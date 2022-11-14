import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { TokenService } from './spotifyAuth/index';

import { UserProfile } from 'src/app/core/models/userProfile';
import { UserPlaylists } from 'src/app/core/models/userPlaylists';
import { UserPlaylistData } from 'src/app/core/models/userPlaylistData';
import { AudioFeatures } from '../models/audioFeatures';

@Injectable()
export class UserDataService {

  userProfileUri = 'https://api.spotify.com/v1/me';
  userPlaylistsUri = 'https://api.spotify.com/v1/me/playlists'
  userPlaylistTracksUri = 'https://api.spotify.com/v1/playlists'
  playlistTrackFeaturesUri = 'https://api.spotify.com/v1/audio-features?ids='


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

  async getPlaylistTracks(button_id: string) {
    const playlist_id = button_id.split(';')[0];
    const playlist_total = parseInt(button_id.split(';')[1]);
    let allSongs: {}[] = [];
    let allSongIds: {}[] = [];

    //loop omdat request limit 100 is, daarom maken we meerdere requests wanneer playlist > 100
    for (let i = 0; i < playlist_total / 100; i++) {
      const songs = await firstValueFrom(this.http.get<UserPlaylistData>(`${this.userPlaylistTracksUri}/${playlist_id}/tracks?offset=${i * 100}`));

      songs.items.forEach(song => {
        //check of song 'track' bestaat omdat local storage bestanden die niet hebben
        if (song.track) {
          allSongs.push(song.track);
          allSongIds.push(song.track.id);
        }
      })
    }
    console.log({'all songs:': allSongs});
    return allSongs;
    // this.getAudioFeatures(allSongIds);
  }

  async getAudioFeatures(ids: {}[] | string) {
    let allAudioFeatures: {}[] = [];
    for (let i = 0; i < ids.length / 100; i++) {
      //sliced iedere keer 100 ids voor 1 http request
      let idsLimit: string[] | string | {}[] = ids.slice(i * 100, i * 100 + 100);
      if(typeof idsLimit !== 'string') {
        idsLimit = idsLimit.join(',');
      }

      const songs = await firstValueFrom(this.http.get<AudioFeatures>(`${this.playlistTrackFeaturesUri}${idsLimit}`));

      songs.audio_features.forEach((song) => allAudioFeatures.push(song));
    }
    console.log({'all audio features:': allAudioFeatures});
  }

}
