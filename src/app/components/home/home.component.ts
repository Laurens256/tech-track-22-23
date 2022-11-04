import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.http.get<any>(`${environment.apiUrl}`, {
      params: {
        code: this.route.snapshot.queryParams["code"]
      }
    }).subscribe(
      (response: { access_token: '' }) => {
        console.log(response.access_token);
      }
    )
  }

}
