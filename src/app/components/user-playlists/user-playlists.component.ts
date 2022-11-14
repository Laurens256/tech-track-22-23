import { Component, OnInit, Input } from '@angular/core';

import { UserPlaylists } from 'src/app/core/models/userPlaylists';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-playlists',
  templateUrl: './user-playlists.component.html',
  styleUrls: ['./user-playlists.component.css']
})
export class UserPlaylistsComponent implements OnInit {

  @Input() data!: UserPlaylists['items'];

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  choosePlaylist(e: HTMLButtonElement) {
    this.router.navigate(['playlist'], { queryParams: { id: e.id } });
  }

}
