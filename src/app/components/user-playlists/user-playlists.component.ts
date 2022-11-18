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
    const playListId = e.id.split(';')[0];
    let playlist;
    this.data.forEach(obj => {
      if(obj.id == playListId) {
        playlist = obj;
      }
    })

    // console.log(playListId);
    // console.log(this.data);

    this.router.navigateByUrl(`playlist?id=${e.id}`, { state: {data: playlist} });
  }

}
