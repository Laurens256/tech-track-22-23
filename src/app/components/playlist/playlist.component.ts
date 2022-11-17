import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';

import { Track, AudioFeatures } from 'src/app/core/models';

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
  playlistTracks: Track[] = [];
  playlistTrackIds: string[] = [];
  playlistTotal: number = 0;

  average: any = {
    valence: 0,
    danceability: 0
  }

  // average = {
  //   valence: 0,
  //   danceability: 0,
  // }

  ngOnInit(): void {
    const id: string = this.route.snapshot.queryParamMap.get('id')!;
    this.getPlaylistTracks(id);
    this.playlistTotal = parseInt(this.route.snapshot.queryParamMap.get('id')!.split(';')[1]);
  }

  async getPlaylistTracks(id: string) {
    const data = await this.userDataService.getPlaylistTracks(id);
    // this.playlistTracks = await this.userDataService.getPlaylistTracks(id);
    this.playlistTracks = data.alltracks;
    this.playlistTrackIds = data.allTrackIds;
    this.loading = false;
  }

  async getAudioFeatures() {
    const data: AudioFeatures[] = await this.userDataService.getAudioFeatures(this.playlistTrackIds);
    console.log(data);
    this.cleanAudioFeatures(data)
  }

  cleanAudioFeatures(arr: AudioFeatures[]) {
    arr.forEach(item => {
      this.average.valence += item.valence;
      this.average.danceability += item.danceability;
    })

    Object.keys(this.average).forEach(key => {
      this.average[key] = this.average[key] / arr.length * 100;
    });
    console.log(this.average);

    // console.log(this.superSecret(this.average));
  }

  // superSecret(spy: any) {
  //   Object.keys(spy).forEach(function (key) {
  //     spy[key] = 10
  //   });
  //   return spy;
  // }

  superSecret(spy: any) {
    Object.keys(spy).forEach(function (key) {
      spy[key] = 10
    });
    return spy;
  }

}
