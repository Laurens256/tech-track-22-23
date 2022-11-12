import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-playlists',
  templateUrl: './user-playlists.component.html',
  styleUrls: ['./user-playlists.component.css']
})
export class UserPlaylistsComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
