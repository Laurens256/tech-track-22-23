import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

import { SpotifyAuthService } from 'src/app/core/services/spotifyAuth/index';

import { UserProfile } from 'src/app/core/models/userProfile';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token: string | null = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private spotifyAuthSvc: SpotifyAuthService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('access_token');
    // console.log(this.token);

    //check of token is opgeslagen
    if (this.token != null && this.token !== 'null' && this.token !== 'undefined') {
      const httpHeaders = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/json'
        })
      }
      this.getUserProfile(httpHeaders);
      return;
    }

    this.http.get<{ access_token: '' }>(`${environment.apiUrl}`, {
      params: {
        code: this.route.snapshot.queryParams["code"]
      }
    }).subscribe(response => {
      this.token = response.access_token;
      localStorage.setItem('access_token', this.token);

      const httpHeaders = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/json'
        })
      }
      this.getUserProfile(httpHeaders)
    });
  }


  getUserProfile(headers: {}) {
    this.http.get<UserProfile>("https://api.spotify.com/v1/me", headers)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.getUserPlaylists(response.id, headers)
        },
        error: (err) => {
          console.log(err);
          //logt opnieuw in als er een error is, activeerd bij iedere error
          //remove access token omdat een error kan komen door expired token
          localStorage.removeItem('access_token');
          this.spotifyAuthSvc.authorize();
        }
      })
  }

  getUserPlaylists(user_id: string, headers: {}) {
    this.http.get(`https://api.spotify.com/v1/users/${user_id}/playlists`, headers)
      .subscribe(response => {
        console.log(response);
      })
  }
}
