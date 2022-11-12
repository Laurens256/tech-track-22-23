import { Component, OnInit, Input } from '@angular/core';
import { UserDataService } from 'src/app/core/services/userData.service';

@Component({
  selector: 'app-user-playlists',
  templateUrl: './user-playlists.component.html',
  styleUrls: ['./user-playlists.component.css']
})
export class UserPlaylistsComponent implements OnInit {

  @Input() data: any;
  test: any;

  constructor(
    private userDataService: UserDataService,
  ) { }

  ngOnInit(): void {
  }

  choosePlaylist(e: HTMLButtonElement) {
    this.userDataService.getPlaylistTracks(e.id);
  }

}
