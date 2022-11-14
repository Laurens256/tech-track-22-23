import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { UserPlaylistData } from 'src/app/core/models/userPlaylistData';

import { browserRefresh } from 'src/app/app.component';

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

  ) {

  }

  userPlaylistData!: any;

  ngOnInit(): void {
    // op refresh, ga terug naar home zodat authorization opnieuw wordt gedaan. Moet vanuit home gedaan worden omdat query params anders verloren gaan
    if(browserRefresh) {
      this.router.navigate(['home']);
      return;
    }

    const id: string = this.route.snapshot.queryParamMap.get('id')!;
    this.getPlaylistTracks(id);
  }

  async getPlaylistTracks(id: string) {
    this.userPlaylistData = await this.userDataService.getPlaylistTracks(id);
  }



}
