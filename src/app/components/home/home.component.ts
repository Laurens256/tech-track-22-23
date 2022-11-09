import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

import { SpotifyAuthService } from 'src/app/core/services/spotifyAuth/index';

import { UserProfile } from 'src/app/core/models/userProfile';
import { UserPlaylists } from 'src/app/core/models/userPlaylists';
import { UserPlaylistData } from 'src/app/core/models/userPlaylistData';

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
		private spotifyAuthSvc: SpotifyAuthService,
	) { }

	ngOnInit(): void {
		this.getBearerToken()
	}

	getBearerToken() {
		this.token = sessionStorage.getItem('access_token');
		// console.log(this.token);

		//check of token is opgeslagen
		if (this.token != null && this.token !== 'null' && this.token !== 'undefined') {
      const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${this.token}`)
            .set('Accept', 'application/json');
			this.getUserProfile(headers);
			return;
		}

		this.http.get<{ access_token: '' }>(`${environment.apiUrl}`, {
			params: {
				code: this.route.snapshot.queryParams["code"]
			}
		}).subscribe(response => {
			this.token = response.access_token;
			sessionStorage.setItem('access_token', this.token);

      const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${this.token}`)
            .set('Accept', 'application/json');
			this.getUserProfile(headers)
		});
	}


	getUserProfile(headers: {}) {
		this.http.get<UserProfile>("https://api.spotify.com/v1/me", {headers: headers})
			.subscribe({
				next: (response) => {
					console.log(response);
					this.getUserPlaylists(response.id, headers)
				},
				error: (err) => {
					console.log(err);
					//logt opnieuw in als er een error is, activeerd bij iedere error
					//remove access token omdat een error kan komen door expired token
					sessionStorage.removeItem('access_token');
					this.spotifyAuthSvc.authorize();
				}
			})
	}

	getUserPlaylists(user_id: string, headers: {}) {
		this.http.get<UserPlaylists>(`https://api.spotify.com/v1/users/${user_id}/playlists`, {headers: headers})
			.subscribe(response => {
				console.log(response);
				this.getPlaylistTracks(response.items[0].id, headers)
			})
	}

	getPlaylistTracks(playlist_id: string, headers: {}) {
		this.http.get<UserPlaylistData>(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {headers: headers})
			.subscribe(response => {
				console.log(response);

        let ids: any = [];
        response.items.forEach(element => {
          ids.push(element.track.id)
        });
        ids = ids.join(',');
        this.getAudioFeatures(ids, headers);
			})
	}

  getAudioFeatures(ids: any, headers: {}) {
    this.http.get(`https://api.spotify.com/v1/audio-features?ids=${ids}`, {headers: headers})
    .subscribe(response => {
      console.log(response);
    })
  }
}
