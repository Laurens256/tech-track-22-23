import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

import { SpotifyAuthService } from 'src/app/services/spotifyAuth/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private spotifyAuthSvc: SpotifyAuthService
  ) { }

  // ngOnInit(): void {
  //   this.http.get<{ access_token: '' }>(`${environment.apiUrl}`, {
  //     params: {
  //       code: this.route.snapshot.queryParams["code"]
  //     }
  //   }).subscribe(
  //     (response: { access_token: '' }) => {
  //       // console.log(response.access_token);
  //       this.token = response.access_token;

  //       const httpHeaders = {
  //         headers: new HttpHeaders({
  //           'Authorization': `Bearer ${this.token}`,
  //           'Accept': 'application/json'
  //         })
  //       }

  //       this.getUserProfile(httpHeaders)
  //     },
  //     (error) => {
  //       console.error('error caught in component')
  //     },
  //   )
  // }

  ngOnInit(): void {
    this.http.get<{ access_token: '' }>(`${environment.apiUrl}`, {
      params: {
        code: this.route.snapshot.queryParams["code"]
      }
    }).subscribe(response => {
      this.token = response.access_token;
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
    this.http.get("https://api.spotify.com/v1/me", headers)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          //TIJDELIJK, logt opnieuw in als er een error is, activeerd bij iedere error
          this.spotifyAuthSvc.authorize();
        }
      })
  }

}
