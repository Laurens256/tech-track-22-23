import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Track } from 'src/app/core/models';


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

  ) {}

  loading: boolean = true;
  playlistTracks: Track[] = [];
  playlistTotal: number = 0;

  ngOnInit(): void {
    const id: string = this.route.snapshot.queryParamMap.get('id')!;
    this.getPlaylistTracks(id);
    this.playlistTotal = parseInt(this.route.snapshot.queryParamMap.get('id')!.split(';')[1]);
  }

  async getPlaylistTracks(id: string) {
    this.playlistTracks = await this.userDataService.getPlaylistTracks(id);
    this.loading = false;
  }



}
