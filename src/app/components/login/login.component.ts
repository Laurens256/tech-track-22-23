import { Component, OnInit } from '@angular/core';
import { SpotifyAuthService } from 'src/app/services/spotifyAuth/service/spotifyAuth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private spotifyAuthService: SpotifyAuthService,
  ) { }

  ngOnInit(): void {}

  spotifyLogin(): void {
    this.spotifyAuthService.authorize();
  }
}
