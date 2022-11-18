import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Track, AudioFeatures, HighlightedTrack, Playlist } from 'src/app/core/models';

import { UserDataService } from 'src/app/core/services/userData.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  constructor(
    private userDataService: UserDataService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  loading: boolean = true;
  hasPlaylist: boolean = false;

  playlist: any;

  playlistTracks: Track[] = [];
  playlistTrackIds: string[] = [];
  playlistTotal: number = 0;

  average: {
    valence: number,
    danceability: number,
    energy: number,
    acousticness: number,
    instrumentalness: number,
  } = {
      valence: 0,
      danceability: 0,
      energy: 0,
      acousticness: 0,
      instrumentalness: 0,
    }

  ngOnInit(): void {
    if (history.state.data) {
      this.playlist = history.state.data;
      this.hasPlaylist = true;
    }
    const id: string = this.route.snapshot.queryParamMap.get('id')!;
    this.getPlaylistTracks(id);
    this.playlistTotal = parseInt(this.route.snapshot.queryParamMap.get('id')!.split(';')[1]);
  }

  async getPlaylistTracks(id: string) {
    const data = await this.userDataService.getPlaylistTracks(id, this.hasPlaylist);

    if (data.playlist != null) this.playlist = data.playlist;
    this.playlistTracks = data.alltracks;
    this.playlistTrackIds = data.allTrackIds;
    this.loading = false;
  }

  async getAudioFeatures() {
    document.querySelector('.visualisation')?.classList.add('visible');
    const data: AudioFeatures[] = await this.userDataService.getAudioFeatures(this.playlistTrackIds);
    this.cleanAudioFeatures(data)
  }

  cleanAudioFeatures(arr: AudioFeatures[]) {
    arr.forEach(item => {
      this.average.valence! += item.valence;
      this.average.danceability! += item.danceability;
      this.average.energy! += item.energy;
      this.average.acousticness! += item.acousticness;
      this.average.instrumentalness! += item.instrumentalness;
    })

    type avgKey = keyof typeof this.average;
    Object.keys(this.average).forEach(key => {
      this.average[key as avgKey] = this.average[key as avgKey] / arr.length * 100;
    });
    console.log(this.average);
  }

  // getHighlights() {

  // }

}
