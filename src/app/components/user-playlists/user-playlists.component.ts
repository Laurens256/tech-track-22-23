import { Component, OnInit, Input } from '@angular/core';

import { Playlist } from 'src/app/core/models/playlist';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-playlists',
  templateUrl: './user-playlists.component.html',
  styleUrls: ['./user-playlists.component.css']
})
export class UserPlaylistsComponent implements OnInit {

  @Input() data!: Playlist[];

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  choosePlaylist(e: HTMLButtonElement) {
    // haal playlist id op uit id van html button
    const playListId = e.id.split(';')[0];

    // zoek playlist met id en pass die via route state data mee zodat data niet opnieuw gefetched hoeft te worden
    let playlist;
    this.data.forEach(obj => {
      if(obj.id == playListId) {
        playlist = obj;
      }
    })

    this.router.navigateByUrl(`playlist?id=${e.id}`, { state: {data: playlist} });
  }

}
